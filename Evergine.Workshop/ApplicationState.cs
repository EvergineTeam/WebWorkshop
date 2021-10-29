using Evergine.Framework;
using Evergine.Workshop.Features.Shapes;
using System;


namespace Evergine.Workshop
{
    public static class ApplicationState
    {

        public static event EventHandler<ShapeComponent> OnEntitySelected;
        public static ShapeManager ShapeManager { get; set; }

        public static void FireEntitySelected(Entity entity)
        {
            ShapeManager.ResetSelectedEntities();

            var shape = entity.FindComponent<ShapeComponent>();

            if (shape != null)
            {
                shape.IsSelected = true;
                OnEntitySelected?.Invoke(null, shape);
            }
        }
    }
}
