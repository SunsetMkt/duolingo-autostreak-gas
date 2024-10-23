const LESSONS = 1;
const DUOLINGO_JWT = "";

async function main() {
  try {
    await autostreak(LESSONS, DUOLINGO_JWT);
  } catch (error) {
    console.log("❌ Something went wrong");
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

async function autostreak(LESSONS, DUOLINGO_JWT) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${DUOLINGO_JWT}`,
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  };

  const jwtPayload = DUOLINGO_JWT.split(".")[1];
  const decodedPayload = Utilities.base64Decode(jwtPayload);
  const { sub } = JSON.parse(
    Utilities.newBlob(decodedPayload).getDataAsString()
  );

  const { fromLanguage, learningLanguage } = JSON.parse(
    UrlFetchApp.fetch(
      `https://www.duolingo.com/2017-06-30/users/${sub}?fields=fromLanguage,learningLanguage`,
      { headers: headers }
    ).getContentText()
  );

  let xp = 0;
  for (let i = 0; i < LESSONS; i++) {
    const session = JSON.parse(
      UrlFetchApp.fetch("https://www.duolingo.com/2017-06-30/sessions", {
        payload: JSON.stringify({
          challengeTypes: [
            "assist",
            "characterIntro",
            "characterMatch",
            "characterPuzzle",
            "characterSelect",
            "characterTrace",
            "characterWrite",
            "completeReverseTranslation",
            "definition",
            "dialogue",
            "extendedMatch",
            "extendedListenMatch",
            "form",
            "freeResponse",
            "gapFill",
            "judge",
            "listen",
            "listenComplete",
            "listenMatch",
            "match",
            "name",
            "listenComprehension",
            "listenIsolation",
            "listenSpeak",
            "listenTap",
            "orderTapComplete",
            "partialListen",
            "partialReverseTranslate",
            "patternTapComplete",
            "radioBinary",
            "radioImageSelect",
            "radioListenMatch",
            "radioListenRecognize",
            "radioSelect",
            "readComprehension",
            "reverseAssist",
            "sameDifferent",
            "select",
            "selectPronunciation",
            "selectTranscription",
            "svgPuzzle",
            "syllableTap",
            "syllableListenTap",
            "speak",
            "tapCloze",
            "tapClozeTable",
            "tapComplete",
            "tapCompleteTable",
            "tapDescribe",
            "translate",
            "transliterate",
            "transliterationAssist",
            "typeCloze",
            "typeClozeTable",
            "typeComplete",
            "typeCompleteTable",
            "writeComprehension",
          ],
          fromLanguage,
          isFinalLevel: false,
          isV2: true,
          juicy: true,
          learningLanguage,
          smartTipsVersion: 2,
          type: "GLOBAL_PRACTICE",
        }),
        headers: headers,
        method: "POST",
      }).getContentText()
    );

    const response = JSON.parse(
      UrlFetchApp.fetch(
        `https://www.duolingo.com/2017-06-30/sessions/${session.id}`,
        {
          payload: JSON.stringify({
            ...session,
            heartsLeft: 0,
            startTime: (+new Date() - 60000) / 1000,
            enableBonusPoints: false,
            endTime: +new Date() / 1000,
            failed: false,
            maxInLessonStreak: 9,
            shouldLearnThings: true,
          }),
          headers: headers,
          method: "PUT",
        }
      ).getContentText()
    );

    xp += response.xpGain;
  }

  console.log(`🎉 You won ${xp} XP`);
}
