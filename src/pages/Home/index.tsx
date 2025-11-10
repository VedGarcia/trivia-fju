import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-600">Home Page</h1>
      <p>Welcome to the home page</p>
      <Link to="/admin">Admin</Link>
      <br />
      <Link to="/game">Game</Link>
    </div>
  );
};
