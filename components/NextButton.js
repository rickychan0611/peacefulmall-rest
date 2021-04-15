import { useRecoilState } from 'recoil';
import { view as viewAtom } from '../atoms';

export default function NextButton() {
    const [view, setView] = useRecoilState(viewAtom);

    return (
        <>
            <button onClick={() => setView(view - 1)}>{view - 1}</button>
            <button onClick={() => setView(view + 1)}>{view + 1}</button>
        </>
    )
};