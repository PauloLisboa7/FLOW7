// auth.js stub
// Authentication feature removed from this project.

console.log('🔒 Auth module disabled.');

// This file is intentionally left mostly empty now that authentication
// has been stripped from the project. Any legacy functions or listeners
// have been removed.


// Local storage helpers for fallback auth
function getLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem('flow7_users') || '[]');
  } catch (e) {
    return [];
  }
}
function saveLocalUsers(users) {
  localStorage.setItem('flow7_users', JSON.stringify(users));
}
function findLocalUser(email) {
  const users = getLocalUsers();
  return users.find(u => u.email === email);
}
function addLocalUser(user) {
  const users = getLocalUsers();
  users.push(user);
  saveLocalUsers(users);
}
function setCurrentUserLocal(user) {
  currentUser = user;
  if (user && user.email) localStorage.setItem('flow7_current_user', user.email);
  else localStorage.removeItem('flow7_current_user');
}
function loadCurrentUserLocal() {
  const email = localStorage.getItem('flow7_current_user');
  if (email) {
    const u = findLocalUser(email);
    if (u) currentUser = u;
  }
}

function isFirebaseAvailable() {
  return typeof firebase !== 'undefined' && firebase && firebase.apps && firebase.apps.length > 0;
}

// migrate any local accounts stored in localStorage to Firestore
async function migrateLocalUsersToFirebase() {
  if (!isFirebaseAvailable()) return;
  const users = getLocalUsers();
  if (!users.length) return;
  try {
    const db = firebase.firestore();
    for (const u of users) {
      // check if user already exists in Firebase
      const methods = await firebase.auth().fetchSignInMethodsForEmail(u.email);
      if (methods.length === 0) {
        // create user in auth with a temporary password then update
        const tempPass = u.password || Math.random().toString(36).slice(-8);
        const res = await firebase.auth().createUserWithEmailAndPassword(u.email, tempPass);
        await res.user.updateProfile({ displayName: u.name });
        await db.collection('users').doc(res.user.uid).set({
          name: u.name,
          email: u.email,
          phone: u.phone || '',
          createdAt: new Date(),
          updatedAt: new Date()
        });
        // optionally send verification
        await res.user.sendEmailVerification().catch(()=>{});
      }
    }
    // once migrated we can clear local list to avoid duplication
    localStorage.removeItem('flow7_users');
    console.log('⚙️ Usuários locais migrados para Firebase');
  } catch (e) {
    console.warn('⚠️ Erro ao migrar usuários locais:', e);
  }
} 

console.log('✅ Auth.js carregado');

// listener guard
let listenersAttached = false;

// Modal control
function openAuthModal(form = 'login') {
  console.log('📡 openAuthModal chamado com form:', form);
  const modal = document.getElementById('auth-modal');
  console.log('📡 Modal encontrado:', modal ? 'SIM' : 'NÃO');
  if (modal) {
    modal.setAttribute('aria-hidden', 'false');
    showAuthForm(form);
    console.log('✅ Modal aberto');
  } else {
    console.error('❌ Modal não encontrado');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
    clearAuthForms();
  }
}

function showAuthForm(formName) {
  console.log('📄 showAuthForm chamado com:', formName);
  // Hide modal forms
  document.getElementById('login-form')?.style.setProperty('display', 'none');
  document.getElementById('signup-form')?.style.setProperty('display', 'none');
  document.getElementById('forgot-form')?.style.setProperty('display', 'none');
  document.getElementById('verify-panel')?.style.setProperty('display', 'none');
  // Hide page forms
  document.getElementById('page-login')?.style.setProperty('display', 'none');
  document.getElementById('page-signup')?.style.setProperty('display', 'none');
  document.getElementById('page-forgot')?.style.setProperty('display', 'none');
  document.getElementById('page-verify')?.style.setProperty('display', 'none');

  if (formName === 'verify') {
    console.log('📄 Mostrando painel de verificação/modal ou página');
    const vp = document.getElementById('verify-panel');
    if (vp) {
      vp.style.display = 'block';
      console.log('📄 Painel de verificação (modal) mostrado');
      return;
    }
    const pv = document.getElementById('page-verify');
    if (pv) {
      pv.style.display = 'block';
      console.log('📄 Painel de verificação (página) mostrado');
      return;
    }
    console.error('❌ Painel de verificação não encontrado nem modal nem página');
    return;
  }

  const formId = formName + '-form';
  const form = document.getElementById(formId);
  console.log('📄 Form element:', formId, form);
  if (form) {
    form.style.display = 'block';
    console.log('📄 Form mostrado:', formId);
  } else {
    console.error('❌ Form não encontrado:', formId);
  }
}

function clearAuthForms() {
  // Clear all form inputs
  document.querySelectorAll('.auth-form input').forEach(input => {
    input.value = '';
  });
  // Clear all error messages
  document.querySelectorAll('.auth-error, .auth-success').forEach(el => {
    el.textContent = '';
    el.classList.remove('show');
  });
  // Reset reCAPTCHA if loaded
  if (typeof grecaptcha !== 'undefined') {
    try {
      grecaptcha.reset();
    } catch(e) {}
  }
}

// Form validation
function validateEmail(email) {
  if (!email || email.trim() === '') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.indexOf('.') > email.indexOf('@');
}

function validatePassword(password) {
  // Mínimo 6 caracteres
  return password && password.length >= 6;
}

// Helper to get prefix based on page context
function getFormPrefix(baseFormType) {
  // If we're on the auth.html page, use "page-" prefix
  if (location.pathname.endsWith('auth.html')) {
    return `page-${baseFormType}`;
  }
  return baseFormType;
}

// Show error message
function showAuthError(formType, message) {
  const prefix = getFormPrefix(formType);
  const errorEl = document.getElementById(`${prefix}-error`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
    setTimeout(() => {
      errorEl.classList.remove('show');
      errorEl.textContent = '';
    }, 5000);
  }
}

// Show success message
function showAuthSuccess(formType, message) {
  const prefix = getFormPrefix(formType);
  const successEl = document.getElementById(`${prefix}-success`);
  if (successEl) {
    successEl.textContent = message;
    successEl.classList.add('show');
    setTimeout(() => {
      successEl.classList.remove('show');
      successEl.textContent = '';
    }, 5000);
  }
}

// Show loading state
function showAuthLoading(formType, show = true) {
  const prefix = getFormPrefix(formType);
  const loadingEl = document.getElementById(`${prefix}-loading`);
  const btnId = `${prefix}-btn`;
  const btn = document.getElementById(btnId);
  
  if (loadingEl) {
    if (show) {
      loadingEl.textContent = 'Processando...';
      loadingEl.classList.add('show');
    } else {
      loadingEl.classList.remove('show');
      loadingEl.textContent = '';
    }
  }
  
  if (btn) {
    btn.disabled = show;
    btn.style.opacity = show ? '0.6' : '1';
    btn.style.cursor = show ? 'not-allowed' : 'pointer';
  }
}

// Login function
async function handleLogin(email, password) {
  // reevaluate firebase availability in case it loaded after init
  useFirebase = isFirebaseAvailable();
  // fallback for local
  if (!useFirebase) {
    console.log('🔐 Modo local: tentando login');
  }
  if (useFirebase) {
    if (typeof firebase === 'undefined') {
      showAuthError('login', '❌ Serviço indisponível. Aguarde e tente novamente.');
      return;
    }
  }
  // Validar campo vazio
  if (!email || email.trim() === '') {
    showAuthError('login', '⚠️ Por favor, insira seu e-mail');
    return;
  }
  
  if (!password || password === '') {
    showAuthError('login', '⚠️ Por favor, insira sua senha');
    return;
  }
  
  // Validar formato de e-mail
  if (!validateEmail(email)) {
    showAuthError('login', '❌ E-mail inválido. Verifique o formato (ex: email@dominio.com.br)');
    return;
  }
  
  showAuthLoading('login', true);
  
  if (useFirebase) {
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
      currentUser = result.user;
      console.log('✅ Login bem-sucedido:', currentUser.email);
      
      // Check if email is verified
      if (!currentUser.emailVerified) {
        console.log('⚠️ E-mail não verificado, mostrando painel de verificação');
        const verifyEmailEl = document.getElementById('verify-email-text');
        if (verifyEmailEl) verifyEmailEl.textContent = currentUser.email;
        showAuthForm('verify');
        showAuthSuccess('verify', '✅ Faça login após verificar seu e-mail.');
        return; // Don't close modal
      }
      
      showAuthSuccess('login', '✅ Login realizado com sucesso! Bem-vindo!');
      setTimeout(() => {
        closeAuthModal();
        updateUserProfile();
      }, 1500);
    } catch (error) {
      console.error('❌ Erro no login:', error);
      let msg = 'Erro ao fazer login';
      if (error.code === 'auth/user-not-found') {
        msg = '❌ Usuário não encontrado';
      } else if (error.code === 'auth/wrong-password') {
        msg = '❌ Senha incorreta';
      } else if (error.message) {
        msg = error.message;
      }
      showAuthError('login', msg);
    } finally {
      showAuthLoading('login', false);
    }
  } else {
    // local login
    const user = findLocalUser(email.trim());
    if (!user) {
      showAuthError('login', '❌ Usuário não encontrado');
      showAuthLoading('login', false);
      return;
    }
    if (user.password !== password) {
      showAuthError('login', '❌ Senha incorreta');
      showAuthLoading('login', false);
      return;
    }
    setCurrentUserLocal(user);
    currentUser = user;
    console.log('✅ Login local bem-sucedido:', currentUser.email);
    showAuthSuccess('login', '✅ Login realizado com sucesso! Bem-vindo!');
    setTimeout(() => {
      closeAuthModal();
      updateUserProfile();
    }, 1500);
    showAuthLoading('login', false);
  }
}

// Signup function
async function handleSignup(name, email, phone, password, confirm) {
  console.log('🔐 handleSignup chamado', { name, email, phone });
  // reevaluate firebase availability because it might have initialized late
  useFirebase = isFirebaseAvailable();
  // if Firebase available, use it; otherwise fallback to local storage
  if (useFirebase) {
    console.log('Firebase disponível, usando para cadastro');
  } else {
    console.log('Firebase indisponível, usando modo local');
  }

  if (useFirebase) {
    // existing firebase logic
    if (typeof firebase === 'undefined' || !firebase.apps || firebase.apps.length === 0) {
      showAuthError('signup', '❌ Serviço indisponível. Aguarde e tente novamente.');
      return;
    }
  }

  // Validar nome
  if (!name || name.trim() === '') {
    showAuthError('signup', '⚠️ Por favor, insira seu nome completo');
    return;
  }
  
  if (name.trim().length < 3) {
    showAuthError('signup', '❌ Nome deve ter no mínimo 3 caracteres');
    return;
  }
  
  // Validar e-mail
  if (!email || email.trim() === '') {
    showAuthError('signup', '⚠️ Por favor, insira seu e-mail');
    return;
  }
  
  if (!validateEmail(email)) {
    showAuthError('signup', '❌ E-mail inválido. Use o formato: seu.email@dominio.com.br');
    return;
  }
  
  // Validar senhas
  if (!password || password === '') {
    showAuthError('signup', '⚠️ Por favor, insira uma senha');
    return;
  }
  
  if (!validatePassword(password)) {
    showAuthError('signup', '❌ Senha deve ter no mínimo 6 caracteres');
    return;
  }
  
  if (!confirm || confirm === '') {
    showAuthError('signup', '⚠️ Por favor, confirme sua senha');
    return;
  }
  
  if (password !== confirm) {
    showAuthError('signup', '❌ As senhas não coincidem. Verifique a digitação.');
    return;
  }
  
  showAuthLoading('signup', true);
  
  if (useFirebase) {
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(email.trim(), password);
      currentUser = result.user;
      
      // Update Firebase Auth profile displayName (so templates can use it)
      try {
        if (currentUser && typeof currentUser.updateProfile === 'function') {
          await currentUser.updateProfile({ displayName: name.trim() });
        }
      } catch (updErr) {
        console.warn('⚠️ Não foi possível atualizar displayName:', updErr);
      }

      // Save user profile to Firestore
      if (typeof firebase !== 'undefined') {
        console.log('📦 firebase object at save:', firebase);
      }
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        const db = firebase.firestore();
        const userData = {
          name: name.trim(),
          email: email.trim(),
          phone: phone || '',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        console.log('📁 Gravando no Firestore:', userData);
        try {
          await db.collection('users').doc(currentUser.uid).set(userData);
          console.log('📁 Documento de usuário criado no Firestore');
        } catch (fsErr) {
          console.error('❌ Erro ao salvar no Firestore:', fsErr);
        }
      } else {
        console.warn('⚠️ Firestore não disponível, pulando gravação');
      }
      
      console.log('✅ Conta criada com sucesso:', currentUser.email);
      showAuthSuccess('signup', '✅ Conta criada com sucesso! Enviando e-mail de verificação...');

      // Send verification email and show the verify panel
      try {
          console.log('📧 Enviando email de verificação para:', currentUser.email);
          if (currentUser && typeof currentUser.sendEmailVerification === 'function') {
          // include actionCodeSettings so developer can control redirect
          const actionCodeSettings = {
            url: window.location.origin + '/auth.html?form=login',
            handleCodeInApp: false // web flow
          };
          await currentUser.sendEmailVerification(actionCodeSettings);
          console.log('📧 Email enviado com sucesso (com link)');
          // Populate verify panel and show it via showAuthForm for consistency
          const verifyEmailEl = document.getElementById('verify-email-text');
          const pageVerifyEmailEl = document.getElementById('page-verify-email-text');
          // Preferir o e-mail do usuário autenticado (mais confiável)
          const resolvedEmail = (currentUser && currentUser.email) ? currentUser.email : (email && email.trim() ? email.trim() : '');
          if (verifyEmailEl) verifyEmailEl.textContent = resolvedEmail;
          if (pageVerifyEmailEl) pageVerifyEmailEl.textContent = resolvedEmail;

          console.log('🔄 Chamando showAuthForm verify');
          showAuthForm('verify');

          showAuthSuccess('verify', '✅ E-mail de verificação enviado! Verifique sua caixa de entrada.');
        } else {
          showAuthError('signup', '❌ Não foi possível enviar o e-mail de verificação. Faça login e solicite o reenvio.');
        }
      } catch (verErr) {
        console.error('❌ Erro ao enviar e-mail de verificação:', verErr);
        showAuthError('verify', '❌ Erro ao enviar e-mail de verificação. Tente novamente mais tarde.');
      }

      // Refresh user profile display
      setTimeout(() => {
        updateUserProfile();
      }, 800);
    } catch (error) {
      console.error('❌ Erro ao criar conta:', error);
      let message = 'Erro ao criar conta';
      
      if (error.code === 'auth/email-already-in-use') {
        message = '❌ Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.';
      } else if (error.code === 'auth/weak-password') {
        message = '❌ Senha muito fraca. Use letras, números e caracteres especiais.';
      } else if (error.code === 'auth/invalid-email') {
        message = '❌ E-mail inválido';
      } else if (error.code === 'auth/operation-not-allowed') {
        message = '❌ Criação de conta não disponível no momento';
      } else if (error.message) {
        message = error.message;
      }
      
      showAuthError('signup', message);
    } finally {
      showAuthLoading('signup', false);
    }
  } else {
    // local fallback
    const eTrim = email.trim();
    if (findLocalUser(eTrim)) {
      showAuthError('signup', '❌ Este e-mail já está cadastrado.');
      showAuthLoading('signup', false);
      return;
    }
    const localUser = { name: name.trim(), email: eTrim, phone: phone || '', password };
    addLocalUser(localUser);
    setCurrentUserLocal(localUser);
    console.log('✅ Usuário local criado:', eTrim);
    showAuthSuccess('signup', '✅ Conta criada com sucesso (local)!');
    showAuthForm('verify');
    const verifyEmailEl = document.getElementById('verify-email-text');
    if (verifyEmailEl) verifyEmailEl.textContent = eTrim;
    setTimeout(() => { updateUserProfile(); }, 800);
    showAuthLoading('signup', false);
  }
}

// Forgot password function
async function handleForgotPassword(email) {
  // reevaluate availability in case SDK loaded later
  useFirebase = isFirebaseAvailable();
  // always require Firebase; no local reset
  if (!useFirebase) {
    showAuthError('forgot', '❌ Recuperação apenas por e-mail. Ative o Firebase para receber o link.');
    return;
  }
  if (typeof firebase === 'undefined') {
    showAuthError('forgot', '❌ Serviço indisponível. Aguarde e tente novamente.');
    return;
  }
  if (!email || email.trim() === '') {
    showAuthError('forgot', '⚠️ Por favor, insira seu e-mail');
    return;
  }

  if (!validateEmail(email)) {
    showAuthError('forgot', '❌ E-mail inválido. Use o formato correto.');
    return;
  }

  showAuthLoading('forgot', true);

  try {
    // Verificar se o e-mail está cadastrado antes de enviar o e-mail de recuperação
    const methods = await firebase.auth().fetchSignInMethodsForEmail(email.trim());
    if (!methods || methods.length === 0) {
      showAuthError('forgot', '❌ E-mail não cadastrado. Verifique ou crie uma nova conta.');
      return;
    }

    // Se existem métodos, enviamos o e-mail de redefinição
    await firebase.auth().sendPasswordResetEmail(email.trim());
    console.log('✅ E-mail de recuperação enviado para:', email);
    showAuthSuccess('forgot', '✅ E-mail de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada (e itens de spam).');
    setTimeout(() => {
      document.getElementById('forgot-email').value = '';
      showAuthForm('login');
    }, 4000);
  } catch (error) {
    console.error('❌ Erro ao verificar/enviar e-mail:', error);
    let message = 'Erro ao enviar e-mail';

    if (error.code === 'auth/invalid-email') {
      message = '❌ E-mail inválido';
    } else if (error.code === 'auth/too-many-requests') {
      message = '⚠️ Muitas tentativas. Tente novamente em alguns minutos.';
    } else if (error.code === 'auth/user-not-found') {
      // fallback
      message = '❌ E-mail não cadastrado. Verifique ou crie uma nova conta.';
    } else if (error.message) {
      message = error.message;
    }

    showAuthError('forgot', message);
  } finally {
    showAuthLoading('forgot', false);
  }
}

// Logout function
async function handleLogout() {
  try {
    await firebase.auth().signOut();
    currentUser = null;
    console.log('✅ Logout realizado');
    updateUserProfile();
  } catch (error) {
    console.error('❌ Erro ao fazer logout:', error);
  }
}

// Update user profile display
function updateUserProfile() {
  const userBtn = document.getElementById('user-btn');
  if (!userBtn) return;
  
  if (currentUser) {
    // User is logged in
    userBtn.style.fontSize = '12px';
    userBtn.style.overflow = 'hidden';
    userBtn.title = `Logout: ${currentUser.email}`;
    
    // Show logout on long press (contextmenu)
    userBtn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (confirm('Fazer logout?')) {
        handleLogout();
      }
    });
  } else {
    // User is logged out
    userBtn.title = 'Entrar na sua conta';
  }
}

// Toggle password visibility
function setupPasswordToggle() {
  const toggles = [
    { btn: 'toggle-password', input: 'login-password' },
    { btn: 'toggle-signup-password', input: 'signup-password' },
    { btn: 'toggle-confirm-password', input: 'signup-confirm' }
  ];
  
  toggles.forEach(({ btn, input }) => {
    const button = document.getElementById(btn);
    const inputEl = document.getElementById(input);
    
    if (button && inputEl) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const type = inputEl.type === 'password' ? 'text' : 'password';
        inputEl.type = type;
        button.style.color = type === 'password' ? 'var(--muted)' : 'var(--accent)';
      });
    }
  });
}

// Event listeners setup
function setupAuthEventListeners() {
  console.log('🔧 setupAuthEventListeners chamado');
  
  // Modal close button
  document.getElementById('auth-close')?.addEventListener('click', closeAuthModal);
  
  // Close modal when clicking outside (on the background)
  document.getElementById('auth-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'auth-modal') closeAuthModal();
  });
  
  // Login form
  document.getElementById('login-btn')?.addEventListener('click', () => {
    console.log('👆 login-btn clicado (modal)');
    const email = document.getElementById('login-email')?.value || '';
    const password = document.getElementById('login-password')?.value || '';
    handleLogin(email, password);
  });
  
  document.getElementById('login-email')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const email = document.getElementById('login-email')?.value || '';
      const password = document.getElementById('login-password')?.value || '';
      handleLogin(email, password);
    }
  });
  
  document.getElementById('login-password')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const email = document.getElementById('login-email')?.value || '';
      const password = document.getElementById('login-password')?.value || '';
      handleLogin(email, password);
    }
  });
  
  // Signup form
  const mSignup = document.getElementById('signup-btn');
  console.log('🔍 modal signup-btn element:', mSignup);
  mSignup?.addEventListener('click', () => {
    console.log('👆 signup-btn clicado');
    const name = (document.getElementById('signup-name') || {}).value || '';
    const email = (document.getElementById('signup-email') || {}).value || '';
    const phone = (document.getElementById('signup-phone') || {}).value || '';
    const password = (document.getElementById('signup-password') || {}).value || '';
    const confirm = (document.getElementById('signup-confirm') || {}).value || '';
    handleSignup(name, email, phone, password, confirm);
  });
  
  // Page signup form (for auth.html page)
  const pSignup = document.getElementById('page-signup-btn');
  console.log('🔍 page signup-btn element:', pSignup);
  pSignup?.addEventListener('click', () => {
    console.log('👆 page-signup-btn clicado');
    const name = document.getElementById('page-signup-name')?.value || '';
    const email = document.getElementById('page-signup-email')?.value || '';
    const phone = document.getElementById('page-signup-phone')?.value || '';
    const password = document.getElementById('page-signup-password')?.value || '';
    const confirm = document.getElementById('page-signup-confirm')?.value || '';
    handleSignup(name, email, phone, password, confirm);
  });
  
  // Page login form (for auth.html page)
  document.getElementById('page-login-btn')?.addEventListener('click', () => {
    console.log('👆 page-login-btn clicado');
    const email = document.getElementById('page-login-email')?.value || '';
    const password = document.getElementById('page-login-password')?.value || '';
    handleLogin(email, password);
  });
  
  document.getElementById('page-login-email')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const email = document.getElementById('page-login-email')?.value || '';
      const password = document.getElementById('page-login-password')?.value || '';
      handleLogin(email, password);
    }
  });
  
  document.getElementById('page-login-password')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const email = document.getElementById('page-login-email')?.value || '';
      const password = document.getElementById('page-login-password')?.value || '';
      handleLogin(email, password);
    }
  });
  
  // Page forgot password form (for auth.html page)
  document.getElementById('page-forgot-btn')?.addEventListener('click', () => {
    const email = document.getElementById('page-forgot-email')?.value || '';
    handleForgotPassword(email);
  });
  
  document.getElementById('page-forgot-email')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const email = document.getElementById('page-forgot-email')?.value || '';
      handleForgotPassword(email);
    }
  });
  
  // Forgot password form
  document.getElementById('forgot-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email')?.value || '';
    handleForgotPassword(email);
  });
  
  document.getElementById('forgot-email')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const email = document.getElementById('forgot-email')?.value || '';
      handleForgotPassword(email);
    }
  });
  
  // Form navigation links
  document.getElementById('to-signup-link')?.addEventListener('click', (e) => {
    console.log('🔗 to-signup-link clicado');
    e.preventDefault();
    openAuthModal('signup');
  });
  
  document.getElementById('to-login-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('login');
  });
  
  document.getElementById('forgot-password-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('forgot');
  });
  
  document.getElementById('back-to-login-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('login');
  });

  // Resend verification link (modal)
  document.getElementById('resend-verification-link')?.addEventListener('click', async (e) => {
    e.preventDefault();
    showAuthLoading('verify', true);
    try {
      const user = firebase.auth().currentUser;
      // Ensure verify email text is populated for UX clarity
      const verifyEmailEl = document.getElementById('verify-email-text');
      if (verifyEmailEl && (!verifyEmailEl.textContent || verifyEmailEl.textContent.trim() === '')) {
        const fallback = (user && user.email) ? user.email : (document.getElementById('signup-email')?.value || '');
        verifyEmailEl.textContent = fallback;
      }
      if (user && typeof user.sendEmailVerification === 'function') {
        await user.sendEmailVerification();
        showAuthSuccess('verify', '✅ Link de verificação reenviado com sucesso! Verifique sua caixa de entrada.');
      } else {
        showAuthError('verify', '❌ Usuário não autenticado. Faça login e tente novamente.');
      }
    } catch (err) {
      console.error('❌ Erro ao reenviar verificação:', err);
      showAuthError('verify', '❌ Não foi possível reenviar o link. Tente novamente mais tarde.');
    } finally {
      showAuthLoading('verify', false);
    }
  });

  // Resend verification link (page)
  document.getElementById('page-resend-verification-link')?.addEventListener('click', async (e) => {
    e.preventDefault();
    showAuthLoading('verify', true);
    try {
      const user = firebase.auth().currentUser;
      const verifyEmailEl = document.getElementById('page-verify-email-text');
      if (verifyEmailEl && (!verifyEmailEl.textContent || verifyEmailEl.textContent.trim() === '')) {
        const fallback = (user && user.email) ? user.email : (document.getElementById('page-signup-email')?.value || '');
        verifyEmailEl.textContent = fallback;
      }
      if (user && typeof user.sendEmailVerification === 'function') {
        await user.sendEmailVerification();
        showAuthSuccess('verify', '✅ Link de verificação reenviado com sucesso! Verifique sua caixa de entrada.');
      } else {
        showAuthError('verify', '❌ Usuário não autenticado. Faça login e tente novamente.');
      }
    } catch (err) {
      console.error('❌ Erro ao reenviar verificação (página):', err);
      showAuthError('verify', '❌ Não foi possível reenviar o link. Tente novamente mais tarde.');
    } finally {
      showAuthLoading('verify', false);
    }
  });
  
  // User profile button
  const userBtn = document.getElementById('user-btn');
  console.log('🔘 User button encontrado:', userBtn ? 'SIM' : 'NÃO');
  userBtn?.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent navigation
    console.log('🔘 User button clicado! currentUser:', currentUser);
    if (currentUser) {
      if (confirm(`Fazer logout de ${currentUser.email}?`)) {
        handleLogout();
      }
    } else {
      openAuthModal('login');
    }
  });
  
  // Setup password visibility toggles
  setupPasswordToggle();
  
  console.log('✅ Event listeners configurados com sucesso');
}

// Initialize authentication when Firebase is ready
function initializeAuth() {
  console.log('⏳ initializeAuth chamado');
  // Bootstrap: read ?form= and show the right panel for page auth
  const url = new URL(window.location.href);
  const form = (url.searchParams.get('form') || 'login').toLowerCase();
  document.getElementById('page-login').style.display = 'none';
  document.getElementById('page-signup').style.display = 'none';
  document.getElementById('page-forgot').style.display = 'none';
  if(form === 'signup') document.getElementById('page-signup').style.display = 'block';
  else if(form === 'forgot') document.getElementById('page-forgot').style.display = 'block';
  else document.getElementById('page-login').style.display = 'block';
  
  // re-evaluate firebase availability each time
  useFirebase = isFirebaseAvailable();
  console.log('📡 Firebase disponível?', useFirebase ? 'SIM' : 'NÃO');

  // if firebase script is present but not yet initialized, retry until apps array fills
  if (typeof firebase !== 'undefined' && (!firebase.apps || firebase.apps.length === 0)) {
    console.log('⏳ Firebase presente mas ainda não inicializado, tentando novamente em 500ms...');
    setTimeout(initializeAuth, 500);
    return;
  }

  // always attach event listeners once
  if (!listenersAttached) {
    setupAuthEventListeners();
    listenersAttached = true;
  }

  if (useFirebase) {
    // migrate local users if this is the first time
    migrateLocalUsersToFirebase().catch(()=>{});
  }

  if (!useFirebase) {
    console.log('⚠️ Inicializando modo local (Firebase indisponível)');
    loadCurrentUserLocal();
    updateUserProfile();
    console.log('✅ Sistema de autenticação local inicializado');
  } else {
    // Firebase is available and initialized
    loadCurrentUserLocal(); // keep any existing local user for fallback
    updateUserProfile();
    console.log('✅ Sistema de autenticação inicializado com sucesso');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  console.log('⏳ DOM ainda está carregando, aguardando DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
  console.log('✅ DOM já está pronto, inicializando agora...');
  initializeAuth();
}
