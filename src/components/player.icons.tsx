import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import { playerStateSpeed } from './player.state'
import { copyToClipboard } from './player.utils'
import { IconShare } from './icons'

export const PlayerIcons = (): ReactElement => {

    const speed = useRecoilValue (playerStateSpeed)

    return (
        <>
            <div className="player-icons">
                <span
                    onClick={(): void => copyToClipboard (speed)}
                    onKeyDown={(): void => undefined}
                    role="button"
                    tabIndex={-1}
                >
                    <img
                        src={IconShare}
                        alt="player-icon-share"
                        className="player-icon-share"
                    />
                </span>
            </div>
        </>
    )

}

