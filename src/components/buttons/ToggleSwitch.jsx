import PropTypes from "prop-types";

export default function ToggleSwitch({ label = "" }) {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <span className="me-3 text-sm font-medium text-white text-opacity-85">
        {label}
      </span>
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="relative w-11 h-6 transition-colors bg-white bg-opacity-30 peer-checked:bg-teal-800 peer-checked:bg-opacity-55 after:bg-white after:bg-opacity-100 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
  );
}

ToggleSwitch.propTypes = {
  label: PropTypes.string,
};
