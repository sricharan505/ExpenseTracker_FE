// Used to display Single Entry.

const DisplaySingleEntry = ({entry}) => {

    return(
        <tr>
            <td>{entry.desc}</td>
            <td>{entry.date}</td>
            <td>{entry.value}</td>
        </tr>
    )
}

export default DisplaySingleEntry;