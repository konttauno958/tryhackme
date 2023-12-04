import React from "react"
import { ButtonStyle } from "../../constants/styles"
import cx from "clsx"

const PrimaryButton: React.FC<any> = (props) => {
  return (
    <button className={cx(ButtonStyle.PrimaryButton)} onClick={props.handleAdd} disabled={props.loading}>
      {
        props.loading ? (
          <div
            className="float-right mr-2 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        ) : null
      }
      {props.varient}
    </button>
  )
}

PrimaryButton.defaultProps = {
  loading: false,
}

export default PrimaryButton
