using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using AppTracking.Resources;
using System.Threading;
using System.Windows.Threading;
using System.Device.Location;
using Microsoft.Phone.Info;
using System.Text;

namespace AppTracking
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();

            // Sample code to localize the ApplicationBar
            //BuildLocalizedApplicationBar();
        }

        private CLocation location;
        private bool running = false;
        private string strDeviceUniqueID;
        private TrackingService.TrackingServiceSoapClient client;
        private void Start_Click(object sender, RoutedEventArgs e)
        {
            if (!running)
            {
                if (!string.IsNullOrEmpty(DeviceID.Text))
                    strDeviceUniqueID = DeviceID.Text;
                else
                    strDeviceUniqueID = Utils.GetUniqueId();
            }
            if (!running && location == null)
            {
                client = new TrackingService.TrackingServiceSoapClient();
                client.UploadCompleted += client_UploadCompleted;
                location = new CLocation();
                location.PrintPosition = this.PrintPosition;
                running = location.GetLocationEvent();
            }
            else if (!running)
                running = location.GetLocationEvent();
            else
            {
                location.WatcherStop();
                running = false;
            }
            Start.Content = !running ? "启动追踪" : "停止追踪";
        }

        private void client_UploadCompleted(object sender, TrackingService.UploadCompletedEventArgs e)
        {

        }

        private void PrintPosition(double latitude, double longitude)
        {
            Latitude.Text = string.Format("{0}", latitude);
            Longitude.Text = string.Format("{0}", longitude);
            client.UploadAsync(DateTime.Now, strDeviceUniqueID, latitude, longitude);
        }

        // Sample code for building a localized ApplicationBar
        //private void BuildLocalizedApplicationBar()
        //{
        //    // Set the page's ApplicationBar to a new instance of ApplicationBar.
        //    ApplicationBar = new ApplicationBar();

        //    // Create a new button and set the text value to the localized string from AppResources.
        //    ApplicationBarIconButton appBarButton = new ApplicationBarIconButton(new Uri("/Assets/AppBar/appbar.add.rest.png", UriKind.Relative));
        //    appBarButton.Text = AppResources.AppBarButtonText;
        //    ApplicationBar.Buttons.Add(appBarButton);

        //    // Create a new menu item with the localized string from AppResources.
        //    ApplicationBarMenuItem appBarMenuItem = new ApplicationBarMenuItem(AppResources.AppBarMenuItemText);
        //    ApplicationBar.MenuItems.Add(appBarMenuItem);
        //}
    }
}