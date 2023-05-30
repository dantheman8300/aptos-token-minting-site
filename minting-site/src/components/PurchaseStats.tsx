

function PurchaseStats(
  props: {
    totalTickets: number,
    userTickets: number,
    purchaseTickets: number,
    poolAmount: number,
    endTimestamp: number,
    ticketPrice: number,
  }
) {

  const userTicketsProjected = (userTickets: number, purchaseTickets: number) => {
    if (purchaseTickets == -1) {
      return <div className={`stat-value `}>{(userTickets).toLocaleString()}</div> 
    } else if(purchaseTickets == 0) {
      return <div className={`stat-value `}>{(userTickets + purchaseTickets).toLocaleString()}</div>
    } else {
      return <div className={`stat-value text-success`}>{(userTickets + purchaseTickets).toLocaleString()}</div>
    }
  }

  const userChance = (totalTickets: number, userTickets: number, purchaseTickets: number) => {
    if (purchaseTickets == -1) {
      return <div className={`stat-value `}>{((userTickets / totalTickets) * 100).toFixed(2)}</div> 
    } else if(purchaseTickets == 0) {
      return <div className={`stat-value `}>{((userTickets + purchaseTickets) / (totalTickets + purchaseTickets) * 100).toFixed(2)}</div>
    } else {
      return <div className={`stat-value text-success`}>{((userTickets + purchaseTickets) / (totalTickets + purchaseTickets) * 100).toFixed(2)}</div>
    }
  }

  const totalTicketsProjected = (totalTickets: number, purchaseTickets: number) => {
    if (purchaseTickets == -1) {
      return <div className={`stat-value `}>{(totalTickets).toLocaleString()}</div> 
    } else if(purchaseTickets == 0) {
      return <div className={`stat-value `}>{(totalTickets + purchaseTickets).toLocaleString()}</div>
    } else {
      return <div className={`stat-value text-success`}>{(totalTickets + purchaseTickets).toLocaleString()}</div>
    }
  }

  const poolAmountProjected = (poolAmount: number, purchaseTickets: number) => {
    if (purchaseTickets == -1) {
      return <div className={`stat-value `}>{(poolAmount).toLocaleString()}SUI</div>
    } else if(purchaseTickets == 0) {
      return <div className={`stat-value `}>{(poolAmount + (purchaseTickets * props.ticketPrice)).toLocaleString()}SUI</div>
    } else {
      return <div className={`stat-value text-success`}>{(poolAmount + (purchaseTickets * props.ticketPrice)).toLocaleString()}SUI</div>
    }
  }

  return (
    <div className="stats shadow stats-vertical">

      <div className="stat">
        <div className="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <div className="stat-title">Current Prize Pool</div>
        {poolAmountProjected(props.poolAmount, props.purchaseTickets)}
      </div>
      
      <div className="stat">
        <div className="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div className="stat-title">Remaining time</div>
        <div className="stat-value mt-2">
          {/* <CountDown endTimestamp={props.endTimestamp} size={2} showUnits={true}/> */}
        </div>
      </div>
  
      <div className="stat ">
        <div className="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
        </div>
        <div className="stat-title">Total tickets</div>
        {totalTicketsProjected(props.totalTickets, props.purchaseTickets)}
        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
      </div>
      
      <div className="stat">
        <div className="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M19 6l-7 6V2.5"/></svg>
        </div>
        <div className={`stat-title `}>Your tickets</div>
        {userTicketsProjected(props.userTickets, props.purchaseTickets)}
        {/* <div className="stat-desc">1/200</div> */}
      </div>
      
      <div className="stat">
        <div className="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"/><path d="M15 7h6v6"/></svg>
        </div>
        <div className="stat-title">Your likelihood</div>
        {userChance(props.totalTickets, props.userTickets, props.purchaseTickets)}
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
      </div>
      
    </div>
  )
}

export default PurchaseStats