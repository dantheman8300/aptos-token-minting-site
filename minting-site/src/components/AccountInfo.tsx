export default function AccountInfo (
  props: {
    address: string,
    balance: string,
    disconnectWallet: () => void
  }
) {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="btn btn-outline btn-secondary m-1">
        <span>
          {/* <span className="">
            {props.balance} APT 
          </span> */}
          <span className="ml-1 font-mono font-normal">
            {shortenAddress(props.address)}
          </span>
          </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </label>
      <ul tabIndex={0} className="dropdown-content btn btn-error p-2 shadow bg-base-100 rounded-box w-52" onClick={props.disconnectWallet}>
        <li><a>Disconnect</a></li>
      </ul>
    </div>
  )
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}