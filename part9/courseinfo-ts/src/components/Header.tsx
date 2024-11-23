interface courseName {
    name: string;
}

const Header = ( props: courseName ) => <h1>{props.name}</h1>

export default Header