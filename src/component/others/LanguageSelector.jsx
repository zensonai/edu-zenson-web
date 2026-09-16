import { useEffect, useState } from "react";
import { FaAngleDown, FaGlobe } from "react-icons/fa6";

const LanguageSelector = () => {
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
    );

    useEffect(() => {
        const applyLanguage = () => {
            const googleSelect = document.querySelector(".goog-te-combo");

            if (!googleSelect) {
                return false;
            }

            const savedLanguage =
                localStorage.getItem("language") || "en";

            googleSelect.value = savedLanguage;

            googleSelect.dispatchEvent(
                new Event("change", {
                    bubbles: true,
                })
            );

            return true;
        };

        const timer = setInterval(() => {
            if (applyLanguage()) {
                clearInterval(timer);
            }
        }, 300);

        return () => clearInterval(timer);
    }, []);

    const changeLanguage = (value) => {
        setLanguage(value);
        localStorage.setItem("language", value);

        const googleSelect = document.querySelector(".goog-te-combo");

        if (!googleSelect) {
            window.location.reload();
            return;
        }

        googleSelect.value = value;

        googleSelect.dispatchEvent(
            new Event("change", {
                bubbles: true,
            })
        );

        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        <div className="relative flex items-center gap-2">
            <FaGlobe className="text-sm text-indigo-700" />

            <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-gray-700 outline-none"
            >
                <option value="en">English</option>
                <option value="si">සිංහල</option>
                <option value="ta">தமிழ்</option>
            </select>

        </div>
    );
};

export default LanguageSelector;