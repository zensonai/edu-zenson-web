import { useEffect } from 'react'

const GoogleTranslate = ({ children }) => {
    useEffect(() => {
        const originalRemoveChild = Node.prototype.removeChild

        Node.prototype.removeChild = function (child) {
            if (child && child.parentNode !== this) {
                return child
            }

            return originalRemoveChild.call(this, child)
        }

        const removeGoogleBar = () => {
            const selectors = [
                'iframe.goog-te-banner-frame',
                'iframe[class*="goog-te-banner-frame"]',
                '.goog-te-banner-frame',
                '.goog-te-banner-frame.skiptranslate',
                'body > .skiptranslate:first-child',
            ]

            selectors.forEach((selector) => {
                document.querySelectorAll(selector).forEach((element) => {
                    element.style.display = 'none'
                    element.style.visibility = 'hidden'
                    element.style.opacity = '0'
                    element.style.width = '0'
                    element.style.height = '0'
                    element.style.position = 'fixed'
                    element.style.left = '-99999px'
                    element.style.top = '-99999px'
                })
            })

            document.body.style.top = '0px'
            document.body.style.marginTop = '0px'
            document.documentElement.style.top = '0px'
        }

        const initGoogleTranslate = () => {
            if (
                window.google &&
                window.google.translate &&
                window.google.translate.TranslateElement
            ) {
                if (!document.querySelector('#google_translate_element .goog-te-gadget')) {
                    new window.google.translate.TranslateElement(
                        {
                            pageLanguage: 'en',
                            includedLanguages: 'en,si,ta',
                            autoDisplay: false,
                        },
                        'google_translate_element'
                    )
                }

                removeGoogleBar()
            }
        }

        window.googleTranslateElementInit = initGoogleTranslate

        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script')

            script.id = 'google-translate-script'
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
            script.async = true

            document.body.appendChild(script)
        }

        const observer = new MutationObserver(() => {
            removeGoogleBar()
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        const interval = setInterval(() => {
            removeGoogleBar()
        }, 1000)

        removeGoogleBar()

        return () => {
            observer.disconnect()
            clearInterval(interval)

            Node.prototype.removeChild = originalRemoveChild

            delete window.googleTranslateElementInit
        }
    }, [])

    return (
        <>
            <div
                id="google_translate_element"
                style={{
                    display: 'none',
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    overflow: 'hidden',
                }}
            />

            {children}
        </>
    )
}

export default GoogleTranslate