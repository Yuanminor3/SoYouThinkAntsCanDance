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
 * This character should draw an Ant or some other interesting custom 3D character by
 * adding geometry to the bones of the character.  We will assume the character's
 * skeleton is a humanoid skeleton in the CMU MoCap database format.  So, you can
 * selectively add geometry to the bone by checking the name of the bone using an
 * "if" statement as demonstrated in the support code.
 */
export class AntCharacter extends AnimatedCharacter
{
    private blackMaterial: gfx.UnlitMaterial;
    private antMaterial: gfx.PhongMaterial;

    constructor() {
        super();

        this.blackMaterial = new gfx.UnlitMaterial();
        this.blackMaterial.setColor(gfx.Color.BLACK);

        this.antMaterial = new gfx.PhongMaterial();
        this.antMaterial.ambientColor.set(0.7, 0, 0);
        this.antMaterial.diffuseColor.set(0.7, 0, 0);
        this.antMaterial.specularColor.set(0.7, 0.7, 0.7);
        this.antMaterial.shininess = 50;
    }


    public override addGeometryToAnimatedBone(bone: AnimatedBone): void
    {
        // PART 5: Create an character!
        //
        // For this part, create a convincing custom character out of basic
        // geometries. Start by creating a basic representation for *every* bone
        // (like you did in the SkeletonCharacter), and add additional
        // geometries for specific parts of the skeleton. We suggest drawing
        // geometries for at least the following parts (defined in the if
        // statement below):
        // - lowerback
        // - upperbackback
        // - thorax
        // - head
        //
        // A full list of available bones (and their hierarchical relationships)
        // can be seen in the skeleton files, for example /public/assets/data/05.asf.
        //
        // Lastly, add a face to the character! The character's face should
        // demonstrate your knowledge of composing transformations; at least one
        // part of the face should adjust the position, the rotation, and the
        // scale (like the antennae on the instructor solution).

        // PART 5.1: Draw specific parts of the character
        if (bone.name == 'lowerback'){
            const boneLength = bone.length; // The length of the bone
            const dir = bone.direction; // direction
    
            const myLowerback = gfx.Geometry3Factory.createSphere(0.1);
            myLowerback.material.setColor(gfx.Color.RED); // random color
            const S = gfx.Matrix4.makeScale(new gfx.Vector3(1.3, 2.5, 1.3));
            // Create a translation matrix
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, boneLength/2, 0));
            const AlignDirAxis = gfx.Matrix4.makeAlign(new gfx.Vector3(0,1,0), dir);
            const T2 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, -0.2 , 0));
            const Mtotal = gfx.Matrix4.multiplyAll(AlignDirAxis,T2,T,S);
            myLowerback.setLocalToParentMatrix(Mtotal, false);
    
            bone.add(myLowerback);
        }
        else if (bone.name == 'upperback'){
            const boneLength = bone.length; // The length of the bone
            const dir = bone.direction; // direction
    
            const myUpperback = gfx.Geometry3Factory.createSphere(0.1);
            myUpperback.material.setColor(gfx.Color.RED); // random color
            // Create a translation matrix
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, boneLength/2, 0));
            const AlignDirAxis = gfx.Matrix4.makeAlign(new gfx.Vector3(0,1,0), dir);
    
            const Mtotal = gfx.Matrix4.multiplyAll(AlignDirAxis, T);
            myUpperback.setLocalToParentMatrix(Mtotal, false);
    
            bone.add(myUpperback);

        }
        else if (bone.name == 'thorax'){
            const boneLength = bone.length; // The length of the bone
            const dir = bone.direction; // direction
            const myThorax = gfx.Geometry3Factory.createSphere(0.1);
            myThorax.material.setColor(gfx.Color.RED); // random color
            // Create a translation matrix
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, boneLength/2, 0));
            const AlignDirAxis = gfx.Matrix4.makeAlign(new gfx.Vector3(0,1,0), dir);
            const T2 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0.04 , 0));
            const Mtotal = gfx.Matrix4.multiplyAll(AlignDirAxis,T2,T);
            myThorax.setLocalToParentMatrix(Mtotal, false);
    
            bone.add(myThorax);

        }
        // *******************************   apply scale + translation + rotation
        else if (bone.name == 'head'){  
            const boneLength = bone.length; // The length of the bone
            const dir = bone.direction; // direction
    
            const myHead = gfx.Geometry3Factory.createSphere(0.1);
            myHead.material.setColor(gfx.Color.RED); // random color
            const S = gfx.Matrix4.makeScale(new gfx.Vector3(1,1.8,1));
            // Create a translation matrix
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0.12, 0.05));
            const Mtotal = gfx.Matrix4.multiplyAll(T,S);
            myHead.setLocalToParentMatrix(Mtotal, false);

            bone.add(myHead);

            // PART 5.2: Add a face to the character
            const myEye1 = gfx.Geometry3Factory.createSphere(0.02);
            const myEye2 = gfx.Geometry3Factory.createSphere(0.02);
            const myMouth = gfx.Geometry3Factory.createBox(0.05, 0.02, 0.015);
            const cap = gfx.Geometry3Factory.createCone(0.13, 0.14);
            //const label = gfx.Geometry3Factory.createCone(0.03, 0.08);
            const label = gfx.Geometry3Factory.createCone(0.03, 0.1);
            myEye1.material.setColor(gfx.Color.BLACK);
            myEye2.material.setColor(gfx.Color.BLACK);
            myMouth.material.setColor(gfx.Color.BLACK);
            cap.material.setColor(gfx.Color.WHITE);
            label.material.setColor(gfx.Color.GREEN);

            // eye1
            const eye1T = gfx.Matrix4.makeTranslation(new gfx.Vector3(-0.04, 0.12, 0.14))
            myEye1.setLocalToParentMatrix(eye1T, false);
            // eye2
            const eye2T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0.04, 0.12, 0.14));
            myEye2.setLocalToParentMatrix(eye2T, false);
            // mouth
            const mouthT = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0.02, 0.13))
            myMouth.setLocalToParentMatrix(mouthT, false);
            // cap
            const CT = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0.32, 0.04));
            cap.setLocalToParentMatrix(CT, false);
            // make label on the cap
            const LT = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0.36, 0.04)); // translation
            const LS = gfx.Matrix4.makeScale(new gfx.Vector3(1, 0.6, 1))        // Scale
            const LR = gfx.Matrix4.makeRotationX(Math.PI);  // Rotation
            const LA = gfx.Matrix4.multiplyAll(LT,LR,LS);
            label.setLocalToParentMatrix(LA, false);

            bone.add(myEye1);
            bone.add(myEye2);
            bone.add(myMouth);
            bone.add(cap);
            bone.add(label);
        }else{

        const radius = 0.01; // Radius of the cylinder = 0.01
        const boneLength = bone.length; // The length of the bone
        const dir = bone.direction; // direction

        const myCylinder = gfx.Geometry3Factory.createCylinder(20, radius, boneLength);
        myCylinder.material.setColor(gfx.Color.BLACK); // random color

        // Create a translation matrix
        const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, boneLength/2, 0));
        const AlignDirAxis = gfx.Matrix4.makeAlign(new gfx.Vector3(0,1,0), dir);

        const Mtotal = gfx.Matrix4.multiplyAll(AlignDirAxis,T);
        myCylinder.setLocalToParentMatrix(Mtotal, false);

        bone.add(myCylinder);
        }
        
    }
}
