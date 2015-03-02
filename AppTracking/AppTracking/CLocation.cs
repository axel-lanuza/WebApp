using System;
using System.Collections.Generic;
using System.Device.Location;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppTracking
{
    public delegate void PrintPosition(double Latitude, double Longitude);
    public class CLocation
    {
        private GeoCoordinateWatcher watcher;
        public PrintPosition PrintPosition;
        public bool GetLocationEvent()
        {
            this.watcher = new GeoCoordinateWatcher();
            this.watcher.PositionChanged += new EventHandler<GeoPositionChangedEventArgs<GeoCoordinate>>(watcher_PositionChanged);
            bool started = this.watcher.TryStart(false, TimeSpan.FromMilliseconds(2000));
            if (!started)
            {
                Console.WriteLine("GeoCoordinateWatcher timed out on start.");
                return false;
            }
            return true;
        }

        public void WatcherStop()
        {
            if (this.watcher != null)
                this.watcher.Stop();
        }

        private void watcher_PositionChanged(object sender, GeoPositionChangedEventArgs<GeoCoordinate> e)
        {
            this._PrintPosition(e.Position.Location.Latitude, e.Position.Location.Longitude);
        }

        private void _PrintPosition(double latitude, double longitude)
        {
            Console.WriteLine("Latitude: {0}, Longitude {1}", latitude, longitude);
            if (this.PrintPosition != null)
                this.PrintPosition(latitude, longitude);
        }

        public static double[] GetLocationProperty()
        {
            double[] latLong = new double[2];

            GeoCoordinateWatcher watcher = new GeoCoordinateWatcher();
            watcher.TryStart(false, TimeSpan.FromMilliseconds(2000));
            GeoCoordinate coord = watcher.Position.Location;
            if (coord.IsUnknown != true)
            {
                latLong[0] = coord.Latitude;
                latLong[1] = coord.Longitude;
            }
            return latLong;
        }
    }
}
