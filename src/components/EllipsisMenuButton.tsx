import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { baseUrl, imageBaseUrl } from '../constants'
import { withPrefix } from '../i18n/translate'
import { Permission } from '../services/PictureService'
import { copyToClipboard } from '../utils/copyToClipboard'
import { isInsidersVersion, toggleIsInsiderVersion } from '../utils/insiders'
import { useMenu } from '../utils/useMenu'
import { Menu, MenuDivider, MenuItem, MenuItemText, MenuItemWithAnchor } from './Menu'

const t = withPrefix('menu')

type Props = {
  pictureId?: string
  permission?: Permission
  className?: string
}

export const EllipsisMenuButton: FC<Props> = ({ pictureId, permission, className }) => {
  const { menuRef, buttonRef: menuButtonRef } = useMenu()

  const imageLink = `${imageBaseUrl}/${pictureId}.svg`
  const pageLink = `${baseUrl}/${pictureId}`

  const aboutPageLink = navigator.language.startsWith('ja')
    ? 'https://about.kakeru.app/ja'
    : 'https://about.kakeru.app'

  return (
    <MenuButton ref={menuButtonRef} className={className}>
      <FontAwesomeIcon icon={faEllipsisH} className="icon" />
      <Menu ref={menuRef}>
        {pictureId !== undefined && (
          <>
            {permission?.accessibilityLevel === 'private' ? (
              <MenuItemText>{t('noImageLink')}</MenuItemText>
            ) : (
              <>
                <MenuItemToCopy text={imageLink}>{t('copyImageLink')}</MenuItemToCopy>
                <MenuItemToCopy text={`[![](${imageLink})](${pageLink})`}>
                  {t('copyImageLinkForMarkdown')}
                </MenuItemToCopy>
                <MenuItemToCopy text={`[${pageLink} ${imageLink}]`}>
                  {t('copyImageLinkForScrapbox')}
                </MenuItemToCopy>
              </>
            )}
            <MenuDivider />
          </>
        )}
        <MenuItemWithLink link={aboutPageLink}>{t('aboutKakeru')}</MenuItemWithLink>
        <MenuItemWithLink link="/flags">{t('experimentalFlags')}</MenuItemWithLink>
        <MenuItem onClick={() => toggleIsInsiderVersion()}>
          {isInsidersVersion ? t('turnOffInsidersVersion') : t('turnOnInsidersVersion')}
        </MenuItem>
      </Menu>
    </MenuButton>
  )
}

const MenuItemToCopy: FC<{ text: string }> = ({ children, text }) => {
  return (
    <MenuItem
      onClick={() => {
        copyToClipboard(text)
      }}
    >
      {children}
    </MenuItem>
  )
}

const MenuItemWithLink: FC<{ link: string }> = ({ link, children }) => {
  return (
    <MenuItemWithAnchor>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </MenuItemWithAnchor>
  )
}

const MenuButton = styled.button`
  width: 36px;
  height: 30px;
  border: 0;
  background: ${isInsidersVersion ? 'green' : '#ddd'};
  position: relative;
  color: inherit;

  ${!isInsidersVersion &&
  css`
    @media (prefers-color-scheme: dark) {
      & {
        background: #444;
      }
    }
  `}
`