using Evergine.Common.Attributes;
using Evergine.Framework;
using System.Collections.Generic;
using System.Linq;


namespace Evergine.Workshop.Features.Shapes
{
    public class ShapeManager : Component
    {
        [IgnoreEvergine]
        public List<ShapeComponent> RegisteredShapes = new List<ShapeComponent>();


        public void AddShape(ShapeComponent shape)
        {
            this.RegisteredShapes.Add(shape);
        }

        public void RemoveShape(ShapeComponent shape)
        {
            this.RegisteredShapes.Remove(shape);
        }

        public ShapeComponent GetSelectedShape()
        {

            return this.RegisteredShapes.FirstOrDefault(s => s.IsSelected == true);
        }

        public void ResetSelectedEntities()
        {
            foreach (var shape in this.RegisteredShapes)
            {
                shape.IsSelected = false;
            }
        }

        protected override void OnActivated()
        {
            base.OnActivated();
            ApplicationState.ShapeManager = this;

        }
    }
}
