// Authentication Module
// Integrates with Firebase Auth

let currentUser = null;

console.log('✅ Auth.js carregado');

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
  document.getElementById('login-form')?.style.setProperty('display', 'none');
  document.getElementById('signup-form')?.style.setProperty('display', 'none');
  document.getElementById('forgot-form')?.style.setProperty('display', 'none');
  
  const formId = formName + '-form';
  const form = document.getElementById(formId);
  if (form) {
    form.style.display = 'block';
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

// Show error message
function showAuthError(formType, message) {
  const errorEl = document.getElementById(`${formType}-error`);
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
  const successEl = document.getElementById(`${formType}-success`);
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
  const loadingEl = document.getElementById(`${formType}-loading`);
  const btnId = `${formType}-btn`;
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
  
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
    currentUser = result.user;
    console.log('✅ Login bem-sucedido:', currentUser.email);
    showAuthSuccess('login', '✅ Login realizado com sucesso! Bem-vindo!');
    setTimeout(() => {
      closeAuthModal();
      updateUserProfile();
    }, 1500);
  } catch (error) {
    console.error('❌ Erro no login:', error);
    let message = 'Erro ao fazer login';
    
    if (error.code === 'auth/user-not-found') {
      message = '❌ E-mail não encontrado. Verifique ou crie uma nova conta.';
    } else if (error.code === 'auth/wrong-password') {
      message = '❌ Senha incorreta. Tente novamente ou redefina sua senha.';
    } else if (error.code === 'auth/invalid-email') {
      message = '❌ E-mail inválido';
    } else if (error.code === 'auth/user-disabled') {
      message = '❌ Conta desabilitada. Contate o suporte.';
    } else if (error.code === 'auth/too-many-requests') {
      message = '⚠️ Muitas tentativas. Tente novamente em alguns minutos.';
    } else if (error.code === 'auth/invalid-credential') {
      message = '❌ E-mail ou senha incorretos';
    }
    
    showAuthError('login', message);
  } finally {
    showAuthLoading('login', false);
  }
}

// Signup function
async function handleSignup(name, email, phone, password, confirm) {
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
  
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email.trim(), password);
    currentUser = result.user;
    
    // Save user profile to Firestore
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      const db = firebase.firestore();
      await db.collection('users').doc(currentUser.uid).set({
        name: name.trim(),
        email: email.trim(),
        phone: phone || '',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    console.log('✅ Conta criada com sucesso:', currentUser.email);
    showAuthSuccess('signup', '✅ Conta criada com sucesso! Bem-vindo à FLOW7!');
    setTimeout(() => {
      closeAuthModal();
      updateUserProfile();
    }, 1500);
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
}

// Forgot password function
async function handleForgotPassword(email) {
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
    await firebase.auth().sendPasswordResetEmail(email.trim());
    console.log('✅ E-mail de recuperação enviado para:', email);
    showAuthSuccess('forgot', '✅ E-mail de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada (e itens de spam).');
    setTimeout(() => {
      document.getElementById('forgot-email').value = '';
      showAuthForm('login');
    }, 4000);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
    let message = 'Erro ao enviar e-mail';
    
    if (error.code === 'auth/user-not-found') {
      message = '❌ E-mail não encontrado. Verifique ou crie uma nova conta.';
    } else if (error.code === 'auth/invalid-email') {
      message = '❌ E-mail inválido';
    } else if (error.code === 'auth/too-many-requests') {
      message = '⚠️ Muitas tentativas. Tente novamente em alguns minutos.';
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
  console.log('🔧 Configurando event listeners...');
  
  // Modal close button
  document.getElementById('auth-close')?.addEventListener('click', closeAuthModal);
  
  // Close modal when clicking outside (on the background)
  document.getElementById('auth-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'auth-modal') closeAuthModal();
  });
  
  // Login form
  document.getElementById('login-btn')?.addEventListener('click', () => {
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
  document.getElementById('signup-btn')?.addEventListener('click', () => {
    const name = (document.getElementById('signup-name') || {}).value || '';
    const email = (document.getElementById('signup-email') || {}).value || '';
    const phone = (document.getElementById('signup-phone') || {}).value || '';
    const password = (document.getElementById('signup-password') || {}).value || '';
    const confirm = (document.getElementById('signup-confirm') || {}).value || '';
    handleSignup(name, email, phone, password, confirm);
  });
  
  // Forgot password form
  document.getElementById('forgot-btn')?.addEventListener('click', () => {
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
    e.preventDefault();
    clearAuthForms();
    showAuthForm('signup');
  });
  
  document.getElementById('to-login-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    clearAuthForms();
    showAuthForm('login');
  });
  
  document.getElementById('forgot-password-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    clearAuthForms();
    showAuthForm('forgot');
  });
  
  document.getElementById('back-to-login-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    clearAuthForms();
    showAuthForm('login');
  });
  
  // User profile button
  const userBtn = document.getElementById('user-btn');
  console.log('🔘 User button encontrado:', userBtn ? 'SIM' : 'NÃO');
  userBtn?.addEventListener('click', () => {
    console.log('🔘 User button clicado! currentUser:', currentUser);
    if (currentUser) {
      if (confirm(`Fazer logout de ${currentUser.email}?`)) {
        handleLogout();
      }
    } else {
      console.log('🎯 Abrindo modal de login...');
      openAuthModal('login');
    }
  });
  
  // Setup password visibility toggles
  setupPasswordToggle();
  
  console.log('✅ Event listeners configurados com sucesso');
}

// Initialize authentication when Firebase is ready
function initializeAuth() {
  console.log('⏳ Inicializando autenticação...');
  console.log('📡 Firebase disponível:', typeof firebase !== 'undefined' ? 'SIM' : 'NÃO');
  
  if (typeof firebase === 'undefined') {
    console.log('⏳ Firebase ainda não carregou, tentando novamente em 500ms...');
    setTimeout(initializeAuth, 500);
    return;
  }
  
  setupAuthEventListeners();
  
  // Listen for auth state changes
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = user;
      console.log('✅ Usuário autenticado:', user.email);
      updateUserProfile();
    } else {
      currentUser = null;
      console.log('ℹ️ Usuário não autenticado');
      updateUserProfile();
    }
  });
  
  console.log('✅ Sistema de autenticação inicializado com sucesso');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  console.log('⏳ DOM ainda está carregando, aguardando DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
  console.log('✅ DOM já está pronto, inicializando agora...');
  initializeAuth();
}
