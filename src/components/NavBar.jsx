      import React from "react";
      import { useState } from "react";

      function NavBar() {
       
      
      return(
      <div
        className="fixed inset-0 z-30 flex items-center justify-center transition-all duration-700"
        style={{
          opacity: focused ? 1 : 0,
          transform: focused ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <h1 className="text-6xl font-bold text-white tracking-wide">
          HELLO WORLD
        </h1>
      </div>
      


    }