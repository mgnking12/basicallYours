
var BY = React.createClass({
        render: function() {
          var message =
            'React has been successfully running for seconds.';

          return <p>{message}</p>;
        }
      });

React.render(
          <BY/>,
    document.getElementById('container')
  );
