import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={510}
    viewBox="0 0 280 510"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="139" cy="131" r="130" />
    <rect x="0" y="291" rx="10" ry="10" width="280" height="32" />
    <rect x="0" y="353" rx="11" ry="11" width="280" height="88" />
    <rect x="0" y="470" rx="10" ry="10" width="95" height="30" />
    <rect x="123" y="463" rx="25" ry="25" width="154" height="45" />
  </ContentLoader>
);

export default Skeleton;
