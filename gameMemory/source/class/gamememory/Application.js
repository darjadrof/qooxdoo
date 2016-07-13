/* ************************************************************************

   Copyright: 

   License:

   Authors: Darja Drofenik

************************************************************************ */

/**
 * This is the main application class of your custom application "gameMemory"
 *
 * @asset(gamememory/*)
 */
qx.Class.define("gamememory.Application",
{
    extend : qx.application.Standalone,



    /*
    *****************************************************************************
        MEMBERS
    *****************************************************************************
    */

    members :
    {
        /**
        * This method contains the initial application code and gets called 
        * during startup of the application
        * 
        * @lint ignoreDeprecated(alert)
        */
        main : function()
        {
            // Call super class
            this.base(arguments);

            // Enable logging in debug variant
            if (qx.core.Environment.get("qx.debug"))
            {
                // support native logging capabilities, e.g. Firebug for Firefox
                qx.log.appender.Native;
                // support additional cross-browser console. Press F7 to toggle visibility
                qx.log.appender.Console;
            }

            // Create a button
            var board = new gamememory.ui.Game();
            //board.prepare(2);

            // Application root
            var doc = this.getRoot();

            // Add board to document at fixed coordinates
            doc.add(board, {left: 10, top: 10});
        }
    }
});
