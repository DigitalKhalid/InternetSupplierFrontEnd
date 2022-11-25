import Themes from '../data/Themes.json'

const applyTheme = (theme) => {
    for (let index = 0; index < Themes.length; index++) {
        const element = Themes[index];

        if (element.title === theme) {
            document.documentElement.style.setProperty('--success', element.detail.success)
            document.documentElement.style.setProperty('--warning', element.detail.warning)
            document.documentElement.style.setProperty('--error', element.detail.error)

            document.documentElement.style.setProperty('--admin-header-bgcolor', element.detail.adminHeaderBgcolor)
            document.documentElement.style.setProperty('--admin-header-color', element.detail.adminHeaderColor)

            document.documentElement.style.setProperty('--admin-footer-bgcolor', element.detail.adminFooterBgcolor)
            document.documentElement.style.setProperty('--admin-footer-color', element.detail.adminFooterColor)

            document.documentElement.style.setProperty('--color', element.detail.color)
            document.documentElement.style.setProperty('--field-color', element.detail.fieldColor)

            document.documentElement.style.setProperty('--border-color', element.detail.borderColor)

            document.documentElement.style.setProperty('--header-bgcolor', element.detail.headerBgcolor)
            document.documentElement.style.setProperty('--body-bgcolor', element.detail.bodyBgcolor)
            document.documentElement.style.setProperty('--footer-bgcolor', element.detail.footerBgcolor)
            document.documentElement.style.setProperty('--actions-bgcolor', element.detail.actionsBgcolor)

            document.documentElement.style.setProperty('--sidebar-bgcolor', element.detail.sidebarBgcolor)
            document.documentElement.style.setProperty('--sidebar-hover-bgcolor', element.detail.sidebarHoverBgcolor)
            document.documentElement.style.setProperty('--sidebar-active-bgcolor', element.detail.sidebarActiveBgcolor)
            document.documentElement.style.setProperty('--sidebar-active-color', element.detail.sidebarActiveColor)
            document.documentElement.style.setProperty('--sidebar-close-color', element.detail.sidebarCloseColor)
            document.documentElement.style.setProperty('--sidebar-open-color', element.detail.sidebarOpenColor)

            document.documentElement.style.setProperty('--gradiant-color-1', element.detail.gradiantColor1)
            document.documentElement.style.setProperty('--gradiant-color-2', element.detail.gradiantColor2)
            document.documentElement.style.setProperty('--bg-image', element.detail.bgImage)

            document.documentElement.style.setProperty('--main-bg', element.detail.mainBg)

            document.documentElement.style.setProperty('--font-family', element.detail.fontFamily)

            document.documentElement.style.setProperty('--popup-overlay-bgcolor', element.detail.popupOverlayBgcolor)
            document.documentElement.style.setProperty('--popup-shadow-color-1', element.detail.popupShadowColor1)
            document.documentElement.style.setProperty('--popup-shadow-color-2', element.detail.popupShadowColor2)
        }
    }
}

export default applyTheme;