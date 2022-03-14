import axios from "axios";
const url = "";
function checkId(email, url) {
  axios
    .get(url + `/user/email`)
    .then(function (response) {
      if (response.data.valid === "1") {
        alert("사용 가능한 이메일입니다.");
        return true;
      } else if (response.data.valid === "0") {
        alert("이미 존재하는 이메일입니다.");
        return false;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function checkEmail(email) {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (regExp.test(email) === false) {
    alert("이메일 형식으로 작성하셔야 합니다.");
    return false;
  }
  return true;
}

function checkNickname(nickname, url) {
  let koreanTotalByte = 0;
  let englishTotalByte = 0;
  for (let i = 0; i < nickname.length; i++) {
    if (escape(nickname.charAt(i)).length > 4) {
      //한글일 경우
      koreanTotalByte += 2;
    } else {
      //영어일 경우
      englishTotalByte += 1;
    }
  }
  if (englishTotalByte === 0 && (koreanTotalByte < 4 || koreanTotalByte > 16)) {
    alert("한글닉네임의 경우 2글자 이상 8글자 이하여야 합니다. ");
    return false;
  } else if (
    koreanTotalByte === 0 &&
    (englishTotalByte < 3 || englishTotalByte > 12)
  ) {
    alert("영어닉네임의 경우 3글자 이상 12글자 이하여야 합니다. ");
    return false;
  } else {
    axios
      .get(url + `/user/nickname`)
      .then(function (response) {
        console.log(response);
        if (response.data.valid === "0") {
          alert("이미 존재하는 닉네임입니다.");
          return false;
        } else if (response.data.valid === "1") {
          alert("사용 가능한 닉네임입니다.");
          return true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function checkPassword(password, email, nickname, name, checkValidHandler) {
  const id = email.split("@")[0];
  if (!/^[a-zA-Z0-9!@#$%\^&*()]{8,12}$/.test(password)) {
    //숫자,영문자,특수문자 조합으로 8~12자리를 사용하는지 확인
    alert("숫자,영문자,특수문자(!@#$%^&*()) 조합으로 8~12자리");
    return false;
  }
  let cnt = 0;
  const checkNum = password.search(/[0-9]/g);
  const checkEng1 = password.search(/[a-z]/g);
  const checkEng2 = password.search(/[A-Z]/g);
  const checkSpecial = password.search(/[!@#$%\^&*()]/g);
  if (checkNum !== -1) cnt++;
  if (checkEng1 !== -1) cnt++;
  if (checkEng2 !== -1) cnt++;
  if (checkSpecial !== -1) cnt++;
  if (cnt < 2) {
    //4가지 중 2가지 들어가야함.
    checkValidHandler(false);
    alert("4가지 중 2가지");
  } else if (!/^[a-zA-Z0-9!@#$%\^&*()]{8,12}$/.test(password)) {
    //숫자,영문자,특수문자 조합으로 8~12자리를 사용하는지 확인
    checkValidHandler(false);
    alert("숫자,영문자,특수문자(!@#$%^&*()) 조합으로 8~12자리여야 합니다.");
  } else if (password.search(id) > -1) {
    checkValidHandler(false);
    alert("비번에 아이디가 포함되어있습니다.");
  } else if (password.search(name) > -1) {
    checkValidHandler(false);
    alert("비번에 이름이 포함되어있습니다.");
  } else if (password.search(nickname) > -1) {
    checkValidHandler(false);
    alert("비번에 닉네임 포함되어있습니다.");
  } else {
    checkValidHandler(true);
  }
}

function checkPasswordConfim(password, passwordConfirm) {
  if (password !== passwordConfirm) {
    return false;
  }
  return true;
}

function checkPhoneNumber(phoneNumber) {
  const regExp = /^[0-9]{3}-[0-9]{3,4}-[0-9]{3,4}$/;
  if (regExp.test(phoneNumber) === false) {
    alert("휴대폰 번호 형식을 다시 확인해주세요");
    return false;
  }
  return true;
}

function checkPhoneDuplicate(phoneNumber, url) {
  axios
    .get(url + `/user/phone`)
    .then(function (response) {
      if (response.data.valid === "1") {
        alert("사용 가능한 휴대폰 번호입니다.");
        return true;
      } else if (response.data.valid === "0") {
        alert("이미 존재하는 휴대폰 번호입니다.");
        return false;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export {
  checkId,
  checkEmail,
  checkNickname,
  checkPassword,
  checkPhoneNumber,
  checkPhoneDuplicate,
  checkPasswordConfim,
};
