import React from 'react';

import Aux from '../../hoc/Aux/Aux';

const layout = (props) => (
    <Aux>
        <header className="container mx-auto">
            <p>Toolbar, SlideMenu</p>
        </header>
        <main className="container mx-auto">
            {props.children}
        </main>
    </Aux>
);

export default layout;
