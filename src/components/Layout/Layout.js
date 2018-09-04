import React from 'react';

import Aux from '../../hoc/Aux/Aux';

const layout = ( props ) => (
    <Aux>
        <header>
            <p>Toolbar, SlideMenu</p>
        </header>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;
