export default (props) => {
  return (
    <section className={`custom-section ${props.ClassPlus}`}>
      {props.children}
    </section>
  );
};
