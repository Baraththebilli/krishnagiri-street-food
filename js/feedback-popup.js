(function () {
  // Don't show again if dismissed/clicked within the last 30 days
  var STORAGE_KEY = "ksfg_feedback_popup_last_seen";
  var COOLDOWN_DAYS = 30;
  var SHOW_AFTER_MS = 20000; // 20 seconds

  var lastSeen = localStorage.getItem(STORAGE_KEY);
  if (lastSeen) {
    var daysSince = (Date.now() - parseInt(lastSeen, 10)) / (1000 * 60 * 60 * 24);
    if (daysSince < COOLDOWN_DAYS) return;
  }

  function markSeen() {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }

  function showPopup() {
    var style = document.createElement("style");
    style.textContent = [
      "#ksfg-feedback-popup {",
      "  position: fixed; bottom: 20px; right: 20px; z-index: 9999;",
      "  background: #fff8f0; border: 2px solid #e65c00; border-radius: 12px;",
      "  box-shadow: 0 4px 16px rgba(0,0,0,0.15); padding: 18px 20px;",
      "  max-width: 280px; font-family: Arial, sans-serif;",
      "  animation: ksfg-slide-in 0.4s ease-out;",
      "}",
      "@keyframes ksfg-slide-in {",
      "  from { transform: translateY(30px); opacity: 0; }",
      "  to { transform: translateY(0); opacity: 1; }",
      "}",
      "#ksfg-feedback-popup p {",
      "  margin: 0 0 12px 0; color: #333; font-size: 14px; line-height: 1.4;",
      "}",
      "#ksfg-feedback-popup a.ksfg-btn {",
      "  display: inline-block; background: #e65c00; color: #fff;",
      "  padding: 8px 14px; border-radius: 6px; text-decoration: none;",
      "  font-size: 13px; font-weight: bold;",
      "}",
      "#ksfg-feedback-popup a.ksfg-btn:hover { background: #b34200; }",
      "#ksfg-feedback-popup button.ksfg-close {",
      "  position: absolute; top: 6px; right: 10px; background: none; border: none;",
      "  font-size: 16px; color: #999; cursor: pointer; line-height: 1;",
      "}",
      "#ksfg-feedback-popup button.ksfg-close:hover { color: #333; }",
      "@media (max-width: 480px) {",
      "  #ksfg-feedback-popup { right: 12px; left: 12px; max-width: none; bottom: 12px; }",
      "}"
    ].join("\n");
    document.head.appendChild(style);

    var popup = document.createElement("div");
    popup.id = "ksfg-feedback-popup";
    popup.style.position = "fixed";
    popup.innerHTML =
      '<button class="ksfg-close" aria-label="Close">&times;</button>' +
      "<p>Enjoying the Krishnagiri Street Food Guide? We'd love to hear your feedback! \uD83D\uDE0A</p>" +
      '<a class="ksfg-btn" href="mailto:krishnagiristreetfood@gmail.com?subject=Feedback%20on%20Krishnagiri%20Street%20Food%20Guide">Email Us</a>';

    document.body.appendChild(popup);

    popup.querySelector(".ksfg-close").addEventListener("click", function () {
      popup.remove();
      markSeen();
    });
    popup.querySelector(".ksfg-btn").addEventListener("click", function () {
      markSeen();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(showPopup, SHOW_AFTER_MS);
    });
  } else {
    setTimeout(showPopup, SHOW_AFTER_MS);
  }
})();
