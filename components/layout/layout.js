import Header from "../header/header";

function Layout(props) {
  return (
    <>
      <Header></Header>
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
