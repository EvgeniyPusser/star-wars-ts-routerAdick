interface Props {
    friend: string;
    pos: number;
}

const Friend = ({friend, pos}: Props) => {
    let styles = "w-full";
    if (pos === 9) {
        styles += " rounded-br-3xl";
    }
    if (pos === 7) {
        styles += " rounded-bl-3xl";
    }
    return (
        <img className={styles} src={friend} alt="Friend"/>
    )
}

export default Friend;