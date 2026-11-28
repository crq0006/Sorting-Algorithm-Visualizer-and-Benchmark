// The decoration box every screen sits in, has back button and exit button
function ScreenCard({title, subtitle, onBack, onExit, wide = false, children}) {
    let cardClass = 'card'
    if (wide) {
        cardClass = 'card card-wide'
    }
    return (
        <section className = {cardClass}>
            {onBack && (<button type = "button" className = "icon-button back-button" onClick = {onBack} aria-label = "Go back">←</button>)}
            {onExit && (<button type = "button" className = "icon-button exit-button" onClick = {onExit}>Exit</button>)}
            <h1 className = "card-title">{title}</h1>
            {subtitle && <p className = "card-subtitle">{subtitle}</p>}
            {children}
        </section>
    )
}

export default ScreenCard