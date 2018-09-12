import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Navigation/Header/Header';

const layout = (props) => (
    <Aux>
        <Header />
        <main className="container mx-auto">
            {props.children}
        </main>
    </Aux>
);

export default layout;
