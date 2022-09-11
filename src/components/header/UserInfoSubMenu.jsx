import React from "react";
import styled from "styled-components";

const Title = styled.p``;
const BoxInfo = styled.div`
  display: flex;
  align-items:flex-start;
  width: 100%;
  margin-top:0.4rem;
  flex-direction:column;
  margin-bottom:-0.6rem;
`;

const UserInfoSubMenu = ({ user }) => {
  return (
    <div>
      {/* Title */}
      <Title>Tài khoản của tôi</Title>
      <BoxInfo>
        {/* Info */}
        {console.log(user)}
        <h6>{`${user?.name||"Đang tải"} - ${user?.email||"Đang tải"} - ${user?.role.split("_")?.[1]||"Đang tải"}`}</h6>
      </BoxInfo>
    </div>
  );
};

export default UserInfoSubMenu;
