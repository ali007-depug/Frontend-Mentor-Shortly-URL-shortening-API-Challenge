export default function Button({hasLink, title, customStyle,onClick }) {
  return (
    <button onClick={onClick} className={` ${!hasLink ? `!text-white block bg-p-cyan hover:bg-p-cyan/55 px-6 py-2 text-center rounded-full capitalize font-bold cursor-pointer ${customStyle}` : ""}`}>
      {hasLink ? <a className={`!text-white block bg-p-cyan hover:bg-p-cyan/55 px-6 py-2 text-center rounded-full capitalize font-bold cursor-pointer ${customStyle}`}
       >{title}</a>  : title }
        
    </button>
  );
}
