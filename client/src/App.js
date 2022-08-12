import React, { useState } from "react";
import Main from "./components/Main";

export default function App() {
  return (
    <main>
      <Main />
      <footer-section class="footer-distributed">
        <div class="footer-right">
          <a href="https://github.com/hugescrub">Github</a>
        </div>

        <div class="footer-left">
          <p class="footer-links">
            <a class="link-1" href="/">
              Home
            </a>
            <a href="/authorize">Authorize</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </p>
        </div>
      </footer-section>
    </main>
  );
}
