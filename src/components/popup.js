import React from 'react';
//File includes code for pop-up buttons used for adding stocks to portfolio

class PopUp extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        // Styling of background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 5,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // Styling of modal window
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
        };

        return (
            <div className="backdrop" style={{backdropStyle}}>
                <div className="modal" style={{modalStyle}}>
                    {this.props.children}

                    <div className="footer">
                        <button onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopUp;