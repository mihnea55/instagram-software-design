// cypress/e2e/app.cy.js

// Test user — created in the first test, reused in all others
const testUser = {
  name: "Cypress User",
  username: "cypressuser2",
  password: "cypress123",
  email: "cypress2@test.com",
  phoneNumber: "0700000000",
};

describe("Register", () => {
  it("should register a new user and redirect to login", () => {
    cy.visit("/");
    cy.contains("Register").click();

    cy.get('input[placeholder="username"]').type(testUser.username);
    cy.get('input[placeholder="password"]').type(testUser.password);
    cy.get('input[placeholder="email"]').type(testUser.email);
    cy.get('input[placeholder="phone number"]').type(testUser.phoneNumber);
    cy.get('input[placeholder="name"]').type(testUser.name);

    cy.contains("button", "Register").click();

    cy.url().should("eq", Cypress.config("baseUrl") + "/");
    cy.contains("Login").should("exist");
  });
});

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
 
  it("should show login page with username and password inputs", () => {
    cy.contains("h1", "Login").should("exist");
    cy.get('input[placeholder="username"]').should("exist");
    cy.get('input[placeholder="password"]').should("exist");
    cy.contains("button", "Login").should("exist");
  });
 
  it("should login with valid credentials and go to main page", () => {
    cy.get('input[placeholder="username"]').type(testUser.username);
    cy.get('input[placeholder="password"]').type(testUser.password);
    cy.contains("button", "Login").click();
 
    cy.url().should("include", "/main");
  });
 
  it("should show alert for wrong password", () => {
    cy.get('input[placeholder="username"]').type(testUser.username);
    cy.get('input[placeholder="password"]').type("wrongpassword");
 
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Incorrect password");
    });
 
    cy.contains("button", "Login").click();
  });
 
  it("should show alert for unknown username", () => {
    cy.get('input[placeholder="username"]').type("nonexistentuser999");
    cy.get('input[placeholder="password"]').type("whatever");
 
    cy.on("window:alert", (text) => {
      expect(text).to.equal("User not found");
    });
 
    cy.contains("button", "Login").click();
  });
 
  it("should navigate to register page when Register button is clicked", () => {
    cy.contains("button", "Register").click();
    cy.url().should("include", "/register");
  });
});

describe("Main Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('input[placeholder="username"]').type(testUser.username);
    cy.get('input[placeholder="password"]').type(testUser.password);
    cy.contains("button", "Login").click();
    cy.url().should("include", "/main");
  });
 
  it("should show the search bar", () => {
    cy.get('input[placeholder="e.g. vnccrstn"]').should("exist");
  });
 
  it("should show users in the list", () => {
    cy.contains("button", testUser.username).should("exist");
  });
 
  it("should filter users when searching by username", () => {
    cy.get('input[placeholder="e.g. vnccrstn"]').type("cypress");
    cy.contains("button", testUser.username).should("exist");
  });
 
  it("should navigate to user profile when clicking a user", () => {
    cy.contains("button", testUser.username).click();
    cy.url().should("include", "/profile/");
  });
});

describe("Profile Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('input[placeholder="username"]').type(testUser.username);
    cy.get('input[placeholder="password"]').type(testUser.password);
    cy.contains("button", "Login").click();
    cy.url().should("include", "/main");
 
    cy.contains("button", testUser.username).click();
    cy.url().should("include", "/profile/");
  });
 
  it("should show username and name on profile", () => {
    cy.contains(testUser.username).should("exist");
  });
 
  it("should show Edit Profile button on own profile", () => {
    cy.contains("button", "Edit profile").should("exist");
  });
 
  it("should navigate to edit profile when clicking Edit profile", () => {
    cy.contains("button", "Edit profile").click();
    cy.url().should("include", "/edit-profile");
  });
 
  it("should show Posts section", () => {
    cy.contains("h2", "Posts").should("exist");
  });
});

describe("Edit Profile", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('input[placeholder="username"]').type(testUser.username);
    cy.get('input[placeholder="password"]').type(testUser.password);
    cy.contains("button", "Login").click();
    cy.url().should("include", "/main");
    cy.visit("/edit-profile");
  });
 
  it("should show the edit profile form with pre-filled fields", () => {
    cy.contains("h1", "Edit Profile").should("exist");
    cy.get('input[placeholder="Username"]').should("have.value", testUser.username);
    cy.get('input[placeholder="Email"]').should("have.value", testUser.email);
  });
 
  it("should update username and save successfully", () => {
    cy.get('input[placeholder="Name"]').clear().type("Updated Cypress");
 
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Profile updated successfully");
    });
 
    cy.contains("button", "Update Profile").click();
  });
});


