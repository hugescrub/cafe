import React, { useState } from "react";
import Main from "./components/Main";

export default function App() {
  return (
    <main>
      <Main />
      <header-section class="header-distributed">
        <div class="header-right">
          <a href="https://github.com/hugescrub">Github</a>
        </div>

        <div class="header-left">
          <p class="header-links">
            <a class="link-1" href="/">
              Home
            </a>
            <a href="/authorize">Authorize</a>
            <a href="#">Pricing</a>
          </p>
        </div>
      </header-section>
    </main>
  );
}
