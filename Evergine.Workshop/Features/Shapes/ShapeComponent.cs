using Evergine.Common.Attributes;
using Evergine.Common.Graphics;
using Evergine.Components.Graphics3D;
using Evergine.Framework;
using Evergine.Framework.Graphics;
using Evergine.Framework.Graphics.Materials;
using Evergine.Mathematics;
using Evergine.Workshop.Features.Colliders;
using System;


namespace Evergine.Workshop.Features.Shapes
{
    public class ShapeComponent: Component
    {
        [BindComponent(source: BindComponentSource.Scene)]
        private ShapeManager shapeManager = null;

        [BindComponent]
        public Transform3D Transform;

        [BindComponent(source: BindComponentSource.Children)]
        public MaterialComponent MaterialComponent;

        [BindComponent(isExactType: false, source: BindComponentSource.Children)]
        public SimpleCollider3D Collider;

        private bool isSelected;
        private Color color;
        private float scaleFactor = 1.0f;
        private Guid shapeId = Guid.NewGuid();
        private Vector3 originalScaleTransform;

        private StandardMaterial standardMaterial;


        [IgnoreEvergine]
        public bool IsSelected
        {
            get => this.isSelected;
            set
            {
                this.isSelected = value;
            }
        }

        public float ScaleFactor
        {
            get => this.scaleFactor;
            set
            {
                if (this.scaleFactor != value)
                {
                    this.scaleFactor = value;
                    this.ChangeSize(value);

                }
            }
        }

        public Guid ShapeId
        {
            get => this.shapeId;
            set { }
        }


        public Color Color
        {
            get => this.color;
            set
            {
                if (this.color != value)
                {
                    this.color = value;
                    if (this.IsAttached)
                    {
                        this.RefreshMaterial();
                    }
                }
            }
        }

        public string GetEntityName()
        {
            return this.Owner.Name;
        }

        private void ChangeSize(float factor)
        {
            this.Transform.Scale = this.originalScaleTransform * factor;
        }


        protected override bool OnAttached()
        {

            var material = this.MaterialComponent.Material;
            this.standardMaterial = new StandardMaterial(material);
            this.color = this.standardMaterial.BaseColor;
            this.originalScaleTransform = this.Transform.Scale;
            this.shapeManager.AddShape(this);
            return base.OnAttached();
        }

        protected override void OnDeactivated()
        {
            this.shapeManager.RemoveShape(this);
            base.OnDeactivated();
        }
        private void RefreshMaterial()
        {
            this.standardMaterial.BaseColor = this.color;
        }
    }
}
