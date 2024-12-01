import PropTypes from "prop-types";

export default function TitleBar({ title }) {
  return (
    <header>
      <section className="TitleBar-section mb-5">
        <div className="TitleBar">
          <h2 className="TitleBar-text">{title}</h2>
        </div>
      </section>
    </header>
  );
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
};
