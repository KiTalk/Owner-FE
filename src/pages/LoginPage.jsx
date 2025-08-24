import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/** 디자인 전용 스타일 컴포넌트들 */
import {
  Screen,
  LogoContainer,
  LogoImage,
  Form,
  Field,
  Input,
  PasswordRow,
  Checkbox, CheckWrap, CheckOverlay, RightLinks, LinkBtn,
  CheckGroup,
  OptionRow,
  LeftOption,
  ErrorText,
  PrimaryBtn,
  SecondaryBtn,
} from "./LoginPage.styles";

import logoImage from "../assets/images/logo.png";
import checkImage from "../assets/images/check.png";

/** ✅ 테스트 전용 계정 (회원가입 없이 이 계정으로만 로그인 허용) */
 const TEST_ID = import.meta.env.VITE_TEST_ID ?? "testuser";
 const TEST_PW = import.meta.env.VITE_TEST_PW ?? "1234";
 const TEST_NM = import.meta.env.VITE_TEST_NM ?? "내가커피";

export default function LoginPage() {
  const navigate = useNavigate();

  /** 폼 상태 */
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState("");

  /** 로그인 핸들러 */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 🔐 테스트 계정만 통과
  if (userId.trim() === TEST_ID && userPw === TEST_PW) {
    // userName은 현재는 userId와 동일하게 저장 (필요 시 별도 입력 필드 만들어 분리 가능)
    const auth = { userId: TEST_ID, userName: TEST_NM, ts: Date.now(), autoLogin };
    localStorage.setItem("auth", JSON.stringify(auth));
      navigate("/order");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다. (테스트 계정만 허용)");
    }
  };

  /** 회원가입 버튼: 실제 페이지는 제공하지 않으므로 안내만 */
  const handleSignupClick = () => {
    alert("회원가입 기능은 제공하지 않습니다.\n테스트 계정으로만 로그인할 수 있어요.");
  };

  return (
    <Screen>
      <LogoContainer>
        <LogoImage src={logoImage} alt="KiTalk 로고" />
      </LogoContainer>

      {/* 입력 폼 */}
      <Form onSubmit={handleSubmit}>
        {/* 아이디 입력 */}
        <Field>
          <Input
            id="userId"
            type="text"
            placeholder="아이디를 입력해 주세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            autoComplete="username"
            inputMode="text"
          />
        </Field>

        {/* 비밀번호 입력 */}
        <Field>
          <PasswordRow>
            <Input
              id="userPw"
              type="password"  
              placeholder="비밀번호를 입력해 주세요"
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
              autoComplete="current-password"
            />
          </PasswordRow>
        </Field>

        {/* 옵션 행: 자동 로그인(좌) | 아이디/비밀번호 찾기(우) */}
        <OptionRow>
      <LeftOption
        type="button"
        onClick={() => setAutoLogin((v) => !v)}
        $mt={-150}         /* 위로 10px 당김 */
        $labelSize={20}   /* 라벨 글씨 크기 */
        aria-pressed={autoLogin}
      >
        <CheckGroup $gap={6}>
        <CheckWrap $size={18}>
          <Checkbox
            aria-checked={autoLogin}
            data-checked={autoLogin}
            $size={18}
          />
          {autoLogin && (
            <CheckOverlay src={checkImage} alt="체크됨" />
          )}
        </CheckWrap>
        </CheckGroup>
        <span>자동 로그인</span>
      </LeftOption>

          <RightLinks>
            <LinkBtn type="button" onClick={() => alert("아이디 찾기는 제공하지 않습니다.")}>
              아이디 찾기
            </LinkBtn>
            <span className="divider" aria-hidden="true">|</span>
            <LinkBtn type="button" onClick={() => alert("비밀번호 찾기는 제공하지 않습니다.")}>
              비밀번호 찾기
            </LinkBtn>
          </RightLinks>
        </OptionRow>

        {/* 에러 메시지 */}
        {error && <ErrorText>{error}</ErrorText>}

        {/* 메인 버튼군: 네이비 채움 / 흰 배경 외곽선 */}
        <PrimaryBtn type="submit">로그인</PrimaryBtn>
        <SecondaryBtn type="button" onClick={handleSignupClick}>
          회원가입
        </SecondaryBtn>
      </Form>
    </Screen>
  );
}