# duolingo-autostreak-gas

A Google Apps Script that automatically keeps your streak on Duolingo alive.

Based on the work of [rfoel](https://github.com/rfoel) and source from [dngnd-forks](https://github.com/dngnd-forks/duolingo-2).

Streak keeper and XP farm for Duolingo. Never get demoted again!

## How to use

1. Star this repository.
2. Go to [Duolingo](https://www.duolingo.com)
3. While logged in, open the browser's console (Option (⌥) + Command (⌘) + J (on macOS) or Shift + CTRL + J (on Windows/Linux))
4. Get the JWT token by pasting this in the console, and copy the value ( without `'`)

```js
document.cookie
  .split(";")
  .find((cookie) => cookie.includes("jwt_token"))
  .split("=")[1];
```

5. Go to [Google Apps Script](https://script.google.com/home).
6. Create a new project, [copy & paste the code](main.gs).
7. Replace `<REPLACE>` in `const DUOLINGO_JWT = "<REPLACE>";` with the JWT token.
8. Save the code and click run. Confirm that the script will connect to third-party services.
9. Set a trigger at `main` function by any period you like.
