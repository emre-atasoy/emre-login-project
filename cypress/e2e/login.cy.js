describe('Login Formu E2E Testleri', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); // Login sayfası
  });

  it('Başarılı form doldurulduğunda submit edip success sayfasına gider', () => {
    // Geçerli email, geçerli password, checkbox işaretli
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password1'); // 1 büyük, 1 küçük, sayı var
    cy.get('input[type="checkbox"]').check();

    // Buton aktif olmalı
    cy.get('button[type="submit"]').should('not.be.disabled');

    // Submit et
    cy.get('form').submit();

    // Success sayfasına yönlendirilmiş mi kontrol et
    cy.url().should('include', '/success');
  });

  it('Email yanlış girildiğinde hata mesajı gösterir, buton disabled olur', () => {
    cy.get('input[name="email"]').type('yanlisemail'); // yanlış email
    cy.get('input[name="password"]').type('Password1'); // doğru password
    cy.get('input[type="checkbox"]').check();

    // Hata mesajı var mı?
    cy.get('.invalid-feedback, div[style*="color: red"]').should('contain.text', 'Geçerli bir email giriniz.');

    // Buton disabled
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Email ve password yanlış girildiğinde 2 hata mesajı görünür', () => {
    cy.get('input[name="email"]').type('yanlisemail'); // yanlış email
    cy.get('input[name="password"]').type('kisa'); // yanlış password (8 karakter değil vs)
    cy.get('input[type="checkbox"]').check();

    // 2 hata mesajı görünmeli
    cy.get('.invalid-feedback, div[style*="color: red"]').should('have.length', 2);

    // Password hatası içeriyor mu?
    cy.get('.invalid-feedback, div[style*="color: red"]').should('contain.text', 'Şifre en az 8 karakter');

    // Buton disabled
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Email ve password doğru ama checkbox işaretlenmediğinde buton disabled olur ve hata mesajı görünür', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password1');
    // checkbox işaretli değil (default false)

    // Hata mesajı var mı?
    cy.get('div[style*="color: red"]').should('contain.text', 'Devam etmek için kutucuğu işaretleyiniz.');

    // Buton disabled
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
