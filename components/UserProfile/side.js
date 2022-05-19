export default ({ user }) => {
  return (
    <div className="userInfoBox">
      <div className="userInfo">
        <div className="userPhoto">
          <img
            src="https://graph.facebook.com/7158156167592570/picture?type=large"
            alt="tuvshinbat596@gmail.com"
          />
        </div>
        <div className="greetings">
          <h6>Түвшинбат Баяндэлгэр</h6>
          <h5>tuvshinbat596@gmail.com</h5>
        </div>
        <div className="store-credit">
          <h5>таны хэтэвч</h5>
          <h4>1,000 ₮</h4>
        </div>
      </div>
    </div>
  );
};
