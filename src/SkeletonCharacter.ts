/* Assignment 4: So You Think Ants Can Dance
 * UMN CSci-4611 Instructors 2012+
 * Significant changes by Prof. Dan Keefe, 2023 
 * Initial GopherGfx implementation by Evan Suma Rosenberg <suma@umn.edu> 2022
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * Please do not distribute beyond the CSci-4611 course
 */ 

import * as gfx from 'gophergfx'
import { AnimatedBone } from './AnimatedBone';
import { AnimatedCharacter } from './AnimatedCharacter'


/**
 * This character should draw each bone as a cylinder with radius 0.01.  Transformation matrices 
 * need to be used to scale, rotate, and translate the cylinder so that it starts at the origin
 * of bone space and extends in the bone's direction with a length equal to the bone's length.
 */
export class SkeletonCharacter extends AnimatedCharacter
{
    constructor() {
        super();
    }

    public override addGeometryToAnimatedBone(bone: AnimatedBone): void
    {
        // PART 3: Create a skeleton.
        //
        // Use a cylinder mesh as a starting point, then scale it, rotate it,
        // and translate it so the bones look like a skeleton. When this part is
        // complete, the skeleton should show representations of every bone, and
        // there should not be gaps between bones.
        //
        // You can also use the skeleton to verify that you've done PART 4 correctly.

        const radius = 0.01; // Radius of the cylinder = 0.01
        const boneLength = bone.length; // The length of the bone
        const dir = bone.direction; // direction

        const myCylinder = gfx.Geometry3Factory.createCylinder(20, radius, boneLength);
        myCylinder.material.setColor(new gfx.Color(1, 1, 0.7)); // random color

        // Create a translation matrix
        const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, boneLength/2, 0));
        const AlignDirAxis = gfx.Matrix4.makeAlign(new gfx.Vector3(0,1,0), dir);

        const Mtotal = gfx.Matrix4.multiplyAll(AlignDirAxis,T);
        myCylinder.setLocalToParentMatrix(Mtotal, false);

        bone.add(myCylinder);

    }
}
