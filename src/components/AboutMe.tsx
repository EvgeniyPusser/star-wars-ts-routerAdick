import {characters, period_month} from "../utils/constants.ts";
import {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router";
import ErrorPage from "./ErrorPage.tsx";

const getCachedHero = (heroId: string) => {
    const cachedHero = JSON.parse(localStorage.getItem(heroId)!);

    if (cachedHero && (Date.now() - cachedHero.timestamp) < period_month) {
        return cachedHero.payload;
    }
};

const AboutMe = () => {
    const {heroId = 'luke'} = useParams();
    const navigate = useNavigate();
    const cachedHero = useMemo(() => getCachedHero(heroId), [heroId]);
    const [loadedHero, setLoadedHero] = useState<{ heroId: string; payload: ReturnType<typeof getCachedHero> }>();
    const heroCodes = useMemo(
        () => Object.entries(characters).filter(([, character]) => character.url.includes('/peoples/')),
        []
    );

    useEffect(() => {
        if (!(heroId in characters)) {
            return;
        }
        if (cachedHero) {
            return;
        }

        fetch(`${characters[heroId as keyof typeof characters].url}`)
            .then(response => response.json())
            .then(data => {
                const info = {
                    name: data.name,
                    gender: data.gender,
                    birth_year: data.birth_year,
                    height: data.height,
                    mass: data.mass,
                    hair_color: data.hair_color,
                    skin_color: data.skin_color,
                    eye_color: data.eye_color
                }
                setLoadedHero({heroId, payload: info});
                localStorage.setItem(heroId, JSON.stringify({
                    payload: info,
                    timestamp: Date.now()
                }));
            })
    }, [cachedHero, heroId])

    const hero = cachedHero ?? (loadedHero?.heroId === heroId ? loadedHero.payload : undefined);

    return (heroId in characters) ? (
        <section className="ml-8 mt-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="text-3xl text-justify tracking-widest leading-14">
                {(!!hero) &&
                    Object.keys(hero).map(key => <p key={key}>
                        <span className={'text-3xl capitalize'}>{key.replace('_', ' ')}</span>: {hero[key]}
                    </p>)}
            </div>
            <div className="w-full max-w-md rounded-2xl bg-gray/80 p-4 shadow-hero">
                <h2 className="mb-4 text-2xl">Hero Codes</h2>
                <label className="mb-2 block text-lg" htmlFor="hero-code-select">Choose hero</label>
                <select
                    id="hero-code-select"
                    className="w-full rounded-xl border border-main/40 bg-black/30 p-3 text-xl outline-none"
                    value={heroId}
                    onChange={(event) => navigate(`/About me/${event.target.value}`)}
                >
                    {heroCodes.map(([code, character]) => (
                        <option key={code} value={code} className="bg-gray text-main">
                            {code} - {character.name}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    ) : <ErrorPage/>
}

export default AboutMe;
