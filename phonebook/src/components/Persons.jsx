import Person from "./Person"

const Persons = ({filteredPersons, handleDelete}) => {
    return (
        <>
            {filteredPersons.map(person => 
            <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
            />
      )}
        </>
    )
}

export default Persons