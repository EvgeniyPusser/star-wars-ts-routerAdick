import {characters, period_month} from "../utils/constants.ts";
import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router";
import ErrorPage from "./ErrorPage.tsx";

const getCachedHero = (heroId: string) => {
    const cachedHero = JSON.parse(localStorage.getItem(heroId)!);

    if (cachedHero && (Date.now() - cachedHero.timestamp) < period_month) {
        return cachedHero.payload;
    }
};

const AboutMe = () => {
    const {heroId = 'luke'} = useParams();
    const cachedHero = useMemo(() => getCachedHero(heroId), [heroId]);
    const [loadedHero, setLoadedHero] = useState<{ heroId: string; payload: ReturnType<typeof getCachedHero> }>();

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
        <>
            {(!!hero) &&
                <div className={'text-3xl text-justify tracking-widest leading-14 ml-8'}>
                    {Object.keys(hero).map(key => <p key={key}>
                        <span className={'text-3xl capitalize'}>{key.replace('_', ' ')}</span>: {hero[key]}
                    </p>)}
                </div>
            }
        </>
    ) : <ErrorPage/>
}

export default AboutMe;
