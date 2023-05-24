import * as React from "react"

const CollapseNote = ({ children, title }) => {
  const [show, setShow] = React.useState(false)

  return (
    <div className="collapse-note-outer">
      <button onClick={() => setShow(!show)}>{title}</button>
      <div
        className="collapse-note-inner"
        style={{ display: !show ? "none" : "block" }}
      >
        {children}
      </div>
    </div>
  )
}

export default CollapseNote
