import React from 'react'
import { Redirect } from 'react-router-dom'

import Player from '../player/Player'

export default (props) => {
  const { match, location } = props

  const [redirectToHome, setRedirectToHome] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [playerTitle, setPlayerTitle] = React.useState(null)
  const [playerSrc, setPlayerSrc] = React.useState(null)

  const queryParams = new URLSearchParams(location.search)

  const getSpeed = () => {
    const querySpeed = queryParams.get('speed')
    if (querySpeed >= 0.5 && querySpeed <= 1.5) {
      return querySpeed
    }
    return 1
  }

  // ask the raw URL to API whenever player.id changes
  React.useEffect(() => {
    const regEx = /^([0-9A-Za-z_-]{11})$/

    if (regEx.test(match.params.id)) {
      setIsLoading(true)
      // const url = `http://localhost:5000/youtube/${match.params.id}`
      const url = `https://api.screwmycode.in/youtube/${match.params.id}`

      fetch(url)
        .then(r => r.json())
        .then((data) => {
          if (data.success) {
            setPlayerTitle(data.title)

            data.type === 'dash' ? setPlayerSrc(data.dashUrl) : setPlayerSrc(data.url)

            setIsLoading(false)
          } else {
            setRedirectToHome(true)
          }
        })
    } else {
      setRedirectToHome(true)
    }
  }, [match.params.id])

  if (redirectToHome) {
    return (
      <Redirect to="/" />
    )
  }

  if (isLoading) {
    document.title = 'screwmycode.in'

    return (
      <React.Fragment>
        <div className="player">
          loading...
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Player
        title={playerTitle}
        src={playerSrc}
        speed={getSpeed()}
      />
    </React.Fragment>
  )
}
